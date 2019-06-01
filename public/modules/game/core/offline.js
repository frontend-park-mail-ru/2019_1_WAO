import GameCore from './index';
import { gameBus, GlobalBus } from '../../eventbus';
import Physics from './physics';
import Score from '../score';
import { genMap } from './mapLogic';

import { gameConfig } from '../gameConfig';
import { setPlayerOnPlate } from '../modules/setPlayerOnPlate';
import Animator from '../game-scene/animation';

export default class OfflineGame extends GameCore {
  constructor(controller, scene, scorePlace) {
    super(controller, scene);
    // Основная шина для общения с другими классами
    // physics.js & index.js
    this.state = {};
    this.state.myIdP = 0;
    // Переменные для начала анимации
    this.gameloop = this.gameloop.bind(this);
    this.gameloopRequestId = null;
    // Константы
    // - Все настройки игры
    this.settings = Object.assign({}, gameConfig);
    // - Задаю канвас
    this.settings.map.canvasHeight = this.scene.giveCanvas().height;
    this.settings.map.canvasWidth = this.scene.giveCanvas().width;
    // Переменные для корректной отрисовки и анимации
    this.settings.render.now = performance.now();

    // Контроллер очков
    this.score = new Score(this.state, scorePlace);
    // Физический контроллер игры
    this.physics = new Physics(this.state, scene.giveCanvas(), this.score, this.settings);
    this.animation = new Animator(this.state, this.scene.giveIndex());
  }

  start() {
    super.start();
    this.state = {
      players: {
        0: {
          x: 0,
          y: 0,
          dx: 0.2,
          dy: 0.002,
          width: 50,
          height: 40,
          idP: 0,
        },
      },
      newPlates: {

      },
    };
    this.state.myIdP = 0;
    this.state.idPhysicBlockCounter = {};
    this.state.idPhysicBlockCounter.idPhys = 0;
    this.state.plates = genMap(
      (this.settings.map.canvasHeight - 20), 
      this.settings.map.koefHeightOfMaxGenerateSlice, 
      this.settings.map.koefGeneratePlates * this.settings.map.koefHeightOfMaxGenerateSlice, 
      this.state.idPhysicBlockCounter);
    this.state.idPhysicBlockCounter.Phys += 1;
    setPlayerOnPlate(this.state.plates[0], this.state.players);
    // Передача указателей на инициализированные переменные
    this.physics.setState(this.state);
    this.score.setState(this.state);
    this.animation.getStateAndIndex(this.state, this.scene.giveIndex());

    setTimeout(
      () => {
        gameBus.trigger('game_start', this.state);
      },
    );
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
      // this.mapController();
      this.state.commands = [{
        idP: 0,
        direction: '',
        delay: this.settings.render.delay,
      },
      ];
      this.state = this.physics.engine();
      if (Object.getOwnPropertyNames(this.state.newPlates).length !== 0) {
        this.scene.addNewPlatesOnCanvas(this.state.newPlates);
        this.state.newPlates = {};
      }
      this.animation.animate();
      this.score.renderScore();
      this.state.commands = [];
      gameBus.trigger('state_changed', this.state);
    }
    if (this.state.players[0].y - this.state.players[0].height > this.settings.map.canvasHeight) {
      setTimeout(() => {
        GlobalBus.trigger('game_score', { score: this.score.scoreCounter() });
        gameBus.trigger('game_finish');
        // gameBus.trigger('game_close');
      });
    }
  }

  onPressedLeftControl(evt) {
    if (this.pressed('LEFT', evt)) {
      this.settings.render.now = performance.now();
      this.settings.render.delay = this.settings.render.now - this.settings.render.lastFrame;
      this.settings.render.lastFrame = this.settings.render.now;
      // this.mapController();

      this.state.commands = [{
        idP: 0,
        direction: 'LEFT',
        delay: this.settings.render.delay,
      },
      ];
      this.state = this.physics.engine();
      if (Object.getOwnPropertyNames(this.state.newPlates).length !== 0) {
        this.scene.addNewPlatesOnCanvas(this.state.newPlates);
        this.state.newPlates = {};
      }
      this.animation.animate();
      gameBus.trigger('state_changed', this.state);
      this.score.renderScore();
      this.state.commands = [];

      this.scene.setState(this.state);
    }
  }

  onPressedRightControl(evt) {
    if (this.pressed('RIGHT', evt)) {
      this.settings.render.now = performance.now();
      this.settings.render.delay = this.settings.render.now - this.settings.render.lastFrame;
      this.settings.render.lastFrame = this.settings.render.now;
      // this.mapController();

      this.state.commands = [{
        idP: 0,
        direction: 'RIGHT',
        delay: this.settings.render.delay,
      },
      ];
      this.state = this.physics.engine();
      if (Object.getOwnPropertyNames(this.state.newPlates).length !== 0) {
        this.scene.addNewPlatesOnCanvas(this.state.newPlates);
        this.state.newPlates = {};
      }
      this.animation.animate();
      gameBus.trigger('state_changed', this.state);
      this.score.renderScore();
      this.state.commands = [];

      this.scene.setState(this.state);
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
    cancelAnimationFrame(this.gameloopRequestId);
    gameBus.trigger('game_close');
  }

  onGameStateChanged(state) {
    this.scene.setState(state);
  }

  destroy() {
    super.destroy();
    cancelAnimationFrame(this.gameloopRequestId);
  }
}
