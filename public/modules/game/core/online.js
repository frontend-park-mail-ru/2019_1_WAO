/* eslint-disable func-names */
import { ENOMEM } from 'constants';
import GameCore from './index';
import { gameBus, GlobalBus } from '../../eventbus';
import Physics from './physics';
import Score from '../score';

import { settings } from '../../../config';

export default class OnlineGame extends GameCore {
  constructor(controller, scene, scorePlace) {
    super(controller, scene);
    // Основная шина для общения с другими классами
    // physics.js & index.js
    this.state = {};
    // this.state.players = [{}];
    // Переменные для начала анимации
    this.gameloop = this.gameloop.bind(this);
    this.gameloopRequestId = null;

    // Константы
    // - Задаю канвас
    this.canvasHeight = this.scene.giveCanvas().height;
    this.canvasWidth = this.scene.giveCanvas().width;
    // - Задаю параметры одной пластины
    this.plate = {};
    this.plate.width = 90;
    this.plate.height = 15;

    // Контроллер очков
    this.score = new Score(this.state, scorePlace);
    // Физический контроллер игры
    this.physics = new Physics(this.state, scene.giveCanvas(), this.score);
    // Переменные для корректной отрисовки и анимации
    this.duration = 1000 / 60;
    this.maxDuration = 1000 / 16;
    this.delay = 0;
    this.lastFrame = 0;
    this.now = performance.now();
    // Скроллинг карты
    this.maxScrollHeight = 0.25 * this.canvasHeight;
    this.minScrollHeight = 0.75 * this.canvasHeight;
    this.koefScrollSpeed = 0.5; // Скорость с которой все объекты будут падать вниз
    // this.state = true;
    this.stateScrollMap = false;  // Нужен для отслеживания другими классами состояния скроллинга
    this.stateGenerateNewMap = false; // Нужен для отслеживания другими классами момента когда надо добавить к своей карте вновь сгенерированный кусок this.state.newPlates
    // Настройки генерации карты
    this.koefGeneratePlates = 0.01;
    this.koefHeightOfMaxGenerateSlice = 2000;
    this.leftIndent = 91;
    this.rightIndent = 91;
    this.idPhysicBlockCounter = 0;  // Уникальный идентификатор нужен для отрисовки новых объектов
    // Для мультиплеера
    this.stateSocketSendedMap = false;
    this.state.mapGap = 0;
    this.state.mapGapSpeed = 0;
    // Для счета
    this.meScore = 0;

    this.state.commands = [];
    this.socket = new WebSocket(`ws://${settings.game.address}/websocket`);
    this.socket.onopen = function (event) {
      alert('Соединение установлено.');
    };
    this.socket.onclose = function (event) {
      if (event.wasClean) {
        alert('Соединение закрыто чисто');
      } else {
        alert('Обрыв соединения'); // например, "убит" процесс сервера
      }
      // alert(`Код: ${event.code} причина: ${event.reason}`);
    };

    this.socket.onmessage = ((event) => {
      const msg = JSON.parse(event.data);
      // console.log(this);
      // console.log(msg.payload);
      switch (msg.type) {
        case 'init':
          this.state.players = [];
          // console.log(msg.payload);
          this.state.myIdP = msg.payload.players[0].idP;
          msg.payload.players.forEach((elem) => {
            this.state.players.push({
              x: elem.x,
              y: elem.y,
              dx: 0.2,
              dy: 0.002,
              width: 50,
              height: 40,
              idP: elem.idP,

            });
          });
          this.state.plates = msg.payload.blocks;
          this.state.plates.forEach((elem) => {
            elem.idPhys = this.idPhysicBlockCounter++;
          });
          // Инициализация физики и блоков
          this.physics.setState(this.state);
          this.score.setState(this.state);
          setTimeout(
            () => {
              gameBus.trigger('game_start', this.state);
            },
          );
          break;
        case 'map':
          this.state.newPlates = msg.payload.blocks;
          const mapGap = (this.state.plates[this.state.plates.length - 1].y - 20)
            - this.state.newPlates[0].y;
          this.state.newPlates.forEach((elem) => {
            elem.y += mapGap;
            elem.idPhys = this.idPhysicBlockCounter++;
          });
          console.log(`Мои блоки:`);
          this.state.plates.forEach((elem) => {
            console.log(elem);
          });
          console.log(`\nПрисланные:`);
          this.state.newPlates.forEach((elem) => {
            console.log(elem);
          });
          this.state.mapGap = 0;  // ------------------
          // console.log(this.state.newPlates);
          Array.prototype.push.apply(this.state.plates, this.state.newPlates);
          this.state.added = false;
          // Сигнал для index.js о том, что пора начать отрисовывать новый кусок карты и почистить старую
          this.stateGenerateNewMap = true;

          // msg.payload.players.forEach((elem) => {
          //   const player = this.foundPlayer(elem.idP);
          //   player.x = elem.x;
          //   player.y = elem.y;
          //   player.dy = elem.dy;
          //   player.dx = elem.dx;
          // });

          break;
        case 'move':
          this.state.commands.push(msg.payload);
          break;
        default:
          break;
      }
    });

    this.socket.onerror = function (error) {
      alert(`Ошибка ${error.message}`);
    };
  }

  start() {
    super.start();
  }

  foundPlayer(id) {
    let i = 0;
    for (;i < this.state.players.length; i++) {
      if (this.state.players[i].idP === id) {
        return this.state.players[i];
      }
    }
    return undefined;
  }

  // Скроллинг карты
  mapController() {
    // Игрок добрался до 3/4 экрана, то все плиты и игрок резко смещаются вниз пока игрок не окажется на 1/4 экрана
    if (this.state.players[0].y <= this.maxScrollHeight && this.stateScrollMap === false) {
      this.stateScrollMap = true; // Сигнал запрещающий выполнять этот код еще раз пока не выполнится else
      // this.socket.send(JSON.stringify({
      //   type: 'map',
      // }));
      // Очистить this.state от старых элементов
      for (let i = 0; i < this.state.plates.length; i++) {
        if (this.state.plates[i].y > this.canvasHeight) {
          this.state.plates.splice(i, 1);
          i--;
        }
      }
      // Задаем всем объектам скорость вниз
      this.state.plates.forEach((plate) => {
        plate.dy = this.koefScrollSpeed;
      });
      this.state.players.forEach((element) => {
        element.dy += this.koefScrollSpeed;
      });
      // Расчет разрыва для мультиплеера
      this.state.mapGapSpeed = this.koefScrollSpeed;
    } else if (this.state.players[0].y > this.minScrollHeight && this.stateScrollMap === true) {
      this.stateScrollMap = false; // Закончился скроллинг
      for (const plate of this.state.plates) {
        plate.dy = 0;
      }
      this.state.players.forEach((element) => {
        element.dy -= this.koefScrollSpeed;
      });
      // this.state.players[0].dy -= this.koefScrollSpeed;

      // Расчет разрыва для мультиплеера
      this.state.mapGapSpeed = 0;
    }
  }

  setPlayerOnPlate(plate) {
    this.state.players[0].y = plate.y - this.plate.height;
    this.state.players[0].x = plate.x + this.plate.width / 2; // Отцентровка игрока по середине
  }

  gameloop() {
    this.gameloopRequestId = requestAnimationFrame(this.gameloop);
    this.now = performance.now();
    this.delay = this.now - this.lastFrame;
    if (this.delay > this.duration) {
      if (this.delay >= this.maxDuration) {
        this.delay = this.maxDuration;
      }
      this.lastFrame = this.now;
      this.mapController();
      if (this.state.commands === []) {
        this.state.commands.push({
          idP: this.state.myIdP,
          direction: '',
          delay: this.delay,
        });
      } else {
        this.state.commands.unshift({
          idP: this.state.myIdP,
          direction: '',
          delay: this.delay,
        });
      }

      this.socket.send(JSON.stringify({
        type: 'move',
        payload: this.state.commands[0],
      }));
      this.state = this.physics.engine();
      this.score.renderScore();
      this.state.commands = [];
      gameBus.trigger('state_changed', this.state);
      if (this.stateGenerateNewMap === true) {
        this.stateGenerateNewMap = false;
        this.state.added = true;
        delete this.state.newPlates;
      }
    }
    if (this.state.players[0].y - this.state.players[0].height > this.canvasHeight) {
      setTimeout(() => {
        alert('LOSE');
        GlobalBus.trigger('game_score', { score: this.meScore });
        gameBus.trigger('game_finish');
        gameBus.trigger('game close');
      });
    }
  }

  onPressedLeftControl(evt) {
    if (this.pressed('LEFT', evt)) {
      this.now = performance.now();
      this.delay = this.now - this.lastFrame;
      this.lastFrame = this.now;
      this.mapController();

      if (this.state.commands === []) {
        this.state.commands.push({
          idP: this.state.myIdP,
          direction: 'LEFT',
          delay: this.delay,
        });
      } else {
        this.state.commands.unshift({
          idP: this.state.myIdP,
          direction: 'LEFT',
          delay: this.delay,
        });
      }
      this.socket.send(JSON.stringify({
        type: 'move',
        payload: this.state.commands[0],
      }));
      this.state = this.physics.engine();
      this.score.renderScore();
      this.state.commands = [];

      this.scene.setState(this.state);
      if (this.stateGenerateNewMap === true) {
        this.state.added = true;
        delete this.state.newPlates;
      }
    }
  }

  onPressedRightControl(evt) {
    if (this.pressed('RIGHT', evt)) {
      this.now = performance.now();
      this.delay = this.now - this.lastFrame;
      this.lastFrame = this.now;
      this.mapController();

      if (this.state.commands === []) {
        this.state.commands.push({
          idP: this.state.myIdP,
          direction: 'RIGHT',
          delay: this.delay,
        });
      } else {
        this.state.commands.unshift({
          idP: this.state.myIdP,
          direction: 'RIGHT',
          delay: this.delay,
        });
      }
      this.socket.send(JSON.stringify({
        type: 'move',
        payload: this.state.commands[0],
      }));
      this.state = this.physics.engine();
      this.score.renderScore();
      this.state.commands = [];

      this.scene.setState(this.state);
      if (this.stateGenerateNewMap === true) {
        this.state.added = true;
        delete this.state.newPlates;
      }
    }
  }

  onGameStarted(state) {
    this.controller.start(); // начинаем слушать события нажатий клавиш
    this.scene.init(state);
    this.scene.start();

    this.lastFrame = performance.now();
    this.gameloopRequestId = requestAnimationFrame(this.gameloop);
  }

  onGameFinished() {
    this.socket.send(JSON.stringify({
      type: 'lose',
      // payload: this.state.commands[0],
    }));
    cancelAnimationFrame(this.gameloopRequestId);
    gameBus.trigger('game_close');
  }

  onGameStateChanged(state) {
    this.scene.setState(state);
  }

  destroy() {
    this.socket.close();
    this.socket.close();
    super.destroy();
    cancelAnimationFrame(this.gameloopRequestId);
  }
}
