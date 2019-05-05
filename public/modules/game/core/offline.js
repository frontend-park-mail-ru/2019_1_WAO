import GameCore from './index';
import { gameBus } from '../../eventbus';
import Physics from './physics';

export default class OfflineGame extends GameCore {
  constructor(controller, scene) {
    super(controller, scene);
    // Основная шина для общения с другими классами
    // physics.js & index.js
    this.state = {};
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

    // Физический контроллер игры
    this.physics = new Physics(this.state, scene.giveCanvas());
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
  }

  start() {
    super.start();
    this.state = {
      players: [{
        x: 0,
        y: 0,
        dx: 0.2,
        dy: 0.002,
        width: 50,
        height: 40,
        idP: 0,
      },
      ],
    };
    this.state.plates = this.genMap((this.canvasHeight - 20), this.koefHeightOfMaxGenerateSlice, this.koefGeneratePlates * this.koefHeightOfMaxGenerateSlice);
    this.setPlayerOnPlate(this.state.plates[0]);
    this.physics.setState(this.state);

    setTimeout(
      () => {
        gameBus.trigger('game_start', this.state);
      },
    );
  }

  // Генератор карты

  genMap(beginY = (this.state.plates[this.state.plates.length - 1].y - 20), b = (this.koefHeightOfMaxGenerateSlice + this.state.plates[this.state.plates.length - 1].y), k = (this.koefGeneratePlates * (this.koefHeightOfMaxGenerateSlice + this.state.plates[this.state.plates.length - 1].y)).toFixed()) {
    const newBlocks = [];
    const p = b / k; // Плотность распределения пластин
    let currentX;
    let currentY = beginY;
    for (let i = 0; i < k; i++) {
      currentX = Math.random() * ((this.canvasWidth - this.rightIndent) - this.leftIndent + 1) + this.leftIndent;
      newBlocks.push({
        x: currentX,
        y: currentY,
        dy: 0,
        idPhys: this.idPhysicBlockCounter++,  // Уникальный идентификатор нужен для отрисовки новых объектов
      });
      currentY -= p;
    }
    return newBlocks;
  }

  // Скроллинг карты
  mapController() {
    // Игрок добрался до 3/4 экрана, то все плиты и игрок резко смещаются вниз пока игрок не окажется на 1/4 экрана
    if (this.state.players[0].y <= this.maxScrollHeight && this.stateScrollMap === false) {
      this.stateScrollMap = true; // Сигнал запрещающий выполнять этот код еще раз пока не выполнится else

      this.state.newPlates = this.genMap();
      Array.prototype.push.apply(this.state.plates, this.state.newPlates);
      // Очистить this.state от старых элементов
      for (let i = 0; i < this.state.plates.length; i++) {
        if (this.state.plates[i].y > this.canvasHeight) {
          this.state.plates.splice(i, 1);
          i--;
        }
      }
      this.state.added = false; // Сигнал для index.js о том, что пора начать отрисовывать новый кусок карты и почистить старую
      this.stateGenerateNewMap = true;
      // Задаем всем объектам скорость вниз
      this.state.plates.forEach((plate) => {
        plate.dy = this.koefScrollSpeed;
      });
      this.state.players.forEach((element) => {
        element.dy += this.koefScrollSpeed;
      });
    } else if (this.state.players[0].y > this.minScrollHeight && this.stateScrollMap === true) {
      this.stateScrollMap = false; // Закончился скроллинг
      this.stateGenerateNewMap = false;
      for (const plate of this.state.plates) {
        plate.dy = 0;
      }
      this.state.players.forEach((element) => {
        element.dy -= this.koefScrollSpeed;
      });
      // this.state.players[0].dy -= this.koefScrollSpeed;
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
      this.state.commands = [{
        idP: 0,
        direction: '',
        delay: this.delay,
      },
      ];
      this.state = this.physics.engine();
      delete this.state.commands;
      gameBus.trigger('state_changed', this.state);
      if (this.stateGenerateNewMap === true) {
        this.state.added = true;
        delete this.state.newPlates;
      }
    }
    if (this.state.players[0].y - this.state.players[0].height > this.canvasHeight) {
      setTimeout(() => {
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

      this.state.commands = [{
        idP: 0,
        direction: 'LEFT',
        delay: this.delay,
      },
      ];
      this.state = this.physics.engine();
      delete this.state.commands;

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

      this.state.commands = [{
        idP: 0,
        direction: 'RIGHT',
        delay: this.delay,
      },
      ];
      this.state = this.physics.engine();
      delete this.state.commands;

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
    cancelAnimationFrame(this.gameloopRequestId);
    gameBus.trigger('game_close');
  }

  onGameStateChanged(state) {
    this.scene.setState(state);
  }
}
