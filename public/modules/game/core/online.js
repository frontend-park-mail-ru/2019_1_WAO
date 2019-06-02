/* eslint-disable no-plusplus */
/* eslint-disable func-names */
import { ENOMEM } from 'constants';
import GameCore from './index';
import { gameBus, GlobalBus } from '../../eventbus';
import Physics from './physics';
import Score from '../score';

import { gameConfig } from '../gameConfig';
import { settings } from '../../../config';
import Animator from '../game-scene/animation';

export default class OnlineGame extends GameCore {
  constructor(controller, scene, scorePlace) {
    super(controller, scene);
    // Основная шина для общения с другими классами
    // physics.js & index.js
    this.hardcode = false;
    this.state = {};
    this.state.otladka = true;
    // this.state.players = [{}];
    // Переменные для начала анимации
    this.gameloop = this.gameloop.bind(this);
    this.gameloopRequestId = null;
    // Константы
    // - Все настройки игры
    this.settings = {};
    Object.assign(this.settings, gameConfig);
    // - Задаю канвас
    this.settings.map.canvasHeight = this.scene.giveCanvas().height;
    this.settings.map.canvasWidth = this.scene.giveCanvas().width;
    // Контроллер очков
    this.score = new Score(this.state, scorePlace);
    // Физический контроллер игры
    this.multiplayer = true;
    this.physics = new Physics(this.state, scene.giveCanvas(), this.score, this.settings, this.multiplayer);
    this.animation = new Animator(this.state, scene.giveIndex());
    // Переменные для корректной отрисовки и анимации
    this.settings.render.now = performance.now();
    this.state.newPlates = {};
    // Для счета
    this.meScore = 0;

    this.state.commands = [];
    this.socket = new WebSocket(`${settings.game.prefix}://${settings.game.address}/websocket`);
    this.socket.onopen = function (event) {
      // alert('Соединение установлено.');
    };
    this.socket.onclose = function (event) {
      // if (event.wasClean) {
      //   alert('Соединение закрыто чисто');
      // } else {
      //   alert('Обрыв соединения'); // например, "убит" процесс сервера
      // }
      // alert(`Код: ${event.code} причина: ${event.reason}`);
    };

    this.socket.onmessage = ((event) => {
      const msg = JSON.parse(event.data);
      switch (msg.type) {
        case 'init':
          GlobalBus.trigger('init_players');

          this.state.players = {};
          this.state.plates = {};
          this.state.idPhysicBlockCounter = {};
          this.state.idPhysicBlockCounter.idPhys = 0;

          this.state.myIdP = msg.payload.players[0].idP;
          msg.payload.players.forEach((elem) => {
            this.state.players[elem.idP] = {
              x: elem.x,
              y: elem.y,
              dx: 0.2,
              dy: 0.002,
              width: 50,
              height: 40,
              idP: elem.idP,
            };
          });
          msg.payload.blocks.forEach((elem) => {
            elem.idPhys = this.state.idPhysicBlockCounter.idPhys;
            this.state.plates[this.state.idPhysicBlockCounter.idPhys] = elem;
            this.state.idPhysicBlockCounter.idPhys += 1;
          });
          // Инициализация физики и блоков
          this.physics.setState(this.state);
          this.score.setState(this.state);
          this.animation.getStateAndIndex(this.state, this.scene.giveIndex());
          GlobalBus.trigger('gap_changed', 0);
          setTimeout(
            () => {
              gameBus.trigger('game_start', this.state);
            },
          );
          break;
        case 'map':
          msg.payload.blocks.forEach((elem) => {
            this.state.newPlates[this.state.idPhysicBlockCounter.idPhys] = elem;
            this.state.newPlates[this.state.idPhysicBlockCounter.idPhys].idPhys = this.state.idPhysicBlockCounter.idPhys;
            this.state.idPhysicBlockCounter.idPhys += 1;
          });
          break;

        case 'move':
          this.state.commands.push(msg.payload);
          break;
        case 'updatePositions_':
          msg.payload.forEach((elem) => {
            const player = this.state.players[elem.idP];
            player.x = elem.x;
            player.y = elem.y;
            player.dy = elem.dy;
            player.dx = elem.dx;
          });
          break;
        case 'lose':
          console.log('lose');
          this.scene.deletePlayer(msg.payload.idP);
          console.log(this.state.players);
          console.log(this.start.myIdP);
          if (this.state.players[this.start.myIdP].y - this.state.players[this.start.myIdP].height > this.settings.map.canvasHeight) {
            GlobalBus.trigger('game_score', {
              score: this.state.score.getScore(),
              won: 'Спасибо за игру. Вы проиграли',
            });
            this.hardcode = !this.hardcode;
          } else {
            GlobalBus.trigger('game_score', {
              score: this.state.score.getScore(),
              won: 'Спасибо за игру. Вы выиграли',
            });
            this.hardcode = !this.hardcode;
          }
          break;
        case 'endgame':
          console.log('endgame');
          GlobalBus.trigger('game_score', {
            score: msg.payload.score,
          });
          gameBus.trigger('game_finish');
          gameBus.trigger('game close');
          break;
        case 'win':
          console.log('win');
          GlobalBus.trigger('game_score', {
            score: msg.payload.score,
            won: 'Вы победили',
          });
          gameBus.trigger('game_finish');
          gameBus.trigger('game close');
          break;
        default:
          break;
      }
    });

    this.socket.onerror = function (error) {
      // alert(`Ошибка ${error.message}`);
      console.log(`Ошибка ${error.message}`);
      GlobalBus.trigger('auth_out');
    };
  }

  start() {
    super.start();
  }

  fixedBlocksCoordinate(plates) {
    const mapGap = (this.state.plates[Object.values(this.state.plates).length - 1].y - 20) - Object.values(plates)[0].y;
    Object.values(plates).forEach((elem) => {
      elem.y += mapGap;
      if (this.state.plates[Object.values(this.state.plates).length - 1].dy != 0) {
        elem.dy = this.settings.player.koefScrollSpeed;
      }
    });
    return plates;
  }

  progressBarCounter() {
    if (this.state.myIdP === 0) {
      // console.log((this.state.players[1].y - this.state.players[0].y) / 1400 * 100);
      return (this.state.players[1].y - this.state.players[0].y) / 1400 * 100;
    }
    // console.log((this.state.players[0].y - this.state.players[1].y) / 1400 * 100);
    return (this.state.players[0].y - this.state.players[1].y) / 1400 * 100;
  }

  gameloop() {
    this.gameloopRequestId = requestAnimationFrame(this.gameloop);
    this.settings.render.now = performance.now();
    this.settings.render.delay = this.settings.render.now - this.settings.render.lastFrame;
    if (this.settings.render.delay > this.settings.render.duration) {
      if (this.settings.render.delay >= this.settings.render.maxDuration) {
        this.settings.render.delay = this.settings.render.maxDuration;
      }
      this.settings.render.lastFrame = this.settings.render.now;
      //   this.mapController();
      const command = {
        idP: this.state.myIdP,
        direction: '',
        delay: this.settings.render.delay,
      };
      this.state.commands.push(command);
      this.state.myCommandIndex = this.state.commands.length - 1;

      this.socket.send(JSON.stringify({
        type: 'move',
        payload: command,
      }));
      if (Object.getOwnPropertyNames(this.state.newPlates).length !== 0) {
        this.state.newPlates = this.fixedBlocksCoordinate(this.state.newPlates);
        Object.assign(this.state.plates, this.state.newPlates);
        this.scene.addNewPlatesOnCanvas(this.state.newPlates);
        this.state.newPlates = {};
      }
      this.state = this.physics.engine();
      this.animation.animate();
      // console.log(`Player 0 y: ${ this.state.players[0].y }, dy: ${ this.state.players[0].dy };\n
      // Player 1 y: ${ this.state.players[1].y }, dy: ${ this.state.players[1].dy };`);
      gameBus.trigger('state_changed', this.state);
      this.score.renderScore();
      GlobalBus.trigger('gap_changed', this.progressBarCounter());
      this.state.commands = [];
    }
    // if (this.state.players[0].y - this.state.players[0].height > this.settings.map.canvasHeight) {
    //   setTimeout(() => {
    //     alert('LOSE');
    //     // GlobalBus.trigger('game_score', { score: this.score });
    //     // gameBus.trigger('game_finish');
    //     // gameBus.trigger('game close');
    //   });
    // }
  }

  onPressedLeftControl(evt) {
    if (this.pressed('LEFT', evt)) {
      this.settings.render.now = performance.now();
      this.settings.render.delay = this.settings.render.now - this.settings.render.lastFrame;
      this.settings.render.lastFrame = this.settings.render.now;
      //   this.mapController();
      const command = {
        idP: this.state.myIdP,
        direction: 'LEFT',
        delay: this.settings.render.delay,
      };
      this.state.commands.push(command);
      this.state.myCommandIndex = this.state.commands.length - 1;

      this.socket.send(JSON.stringify({
        type: 'move',
        payload: command,
      }));
      if (Object.getOwnPropertyNames(this.state.newPlates).length !== 0) {
        this.state.newPlates = this.fixedBlocksCoordinate(this.state.newPlates);
        Object.assign(this.state.plates, this.state.newPlates);
        this.scene.addNewPlatesOnCanvas(this.state.newPlates);
        this.state.newPlates = {};
      }
      this.state = this.physics.engine();
      this.animation.animate();
      gameBus.trigger('state_changed', this.state);
      this.score.renderScore();
      GlobalBus.trigger('gap_changed',  this.progressBarCounter());
      this.state.commands = [];

      // this.scene.setState(this.state);
    }
  }

  onPressedRightControl(evt) {
    if (this.pressed('RIGHT', evt)) {
      this.settings.render.now = performance.now();
      this.settings.render.delay = this.settings.render.now - this.settings.render.lastFrame;
      this.settings.render.lastFrame = this.settings.render.now;
      //   this.mapController();

      const command = {
        idP: this.state.myIdP,
        direction: 'RIGHT',
        delay: this.settings.render.delay,
      };
      this.state.commands.push(command);
      this.state.myCommandIndex = this.state.commands.length - 1;

      this.socket.send(JSON.stringify({
        type: 'move',
        payload: command,
      }));
      if (Object.getOwnPropertyNames(this.state.newPlates).length !== 0) {
        this.state.newPlates = this.fixedBlocksCoordinate(this.state.newPlates);
        Object.assign(this.state.plates, this.state.newPlates);
        this.scene.addNewPlatesOnCanvas(this.state.newPlates);
        this.state.newPlates = {};
      }
      this.state = this.physics.engine();
      this.animation.animate();
      gameBus.trigger('state_changed', this.state);
      this.score.renderScore();
      GlobalBus.trigger('gap_changed', this.progressBarCounter());
      this.state.commands = [];

      // this.scene.setState(this.state);
    }
  }

  onGameStarted(state) {
    this.controller.start(); // начинаем слушать события нажатий клавиш
    this.scene.init(state);
    this.scene.start();

    this.settings.render.lastFrame = performance.now();
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
