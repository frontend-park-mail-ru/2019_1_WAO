import GameCore from './index';
import { gameBus, GlobalBus } from '../../eventbus';
import Physics from './physics';
import Score from '../score';
import { genMap } from './mapLogic';

export default class OfflineGame extends GameCore {
  constructor(controller, scene, scorePlace) {
    super(controller, scene);
    // Основная шина для общения с другими классами
    // physics.js & index.js
    this.state = {};
    // Переменные для начала анимации
    this.gameloop = this.gameloop.bind(this);
    this.gameloopRequestId = null;

    // Контроллер очков
    this.score = new Score(this.state, scorePlace);
    // Физический контроллер игры
    this.physics = new Physics(this.state, scene.giveCanvas(), this.score);

    // Константы
    // - Задаю канвас
    this.canvasHeight = this.scene.giveCanvas().height;
    this.canvasWidth = this.scene.giveCanvas().width;
    // - Задаю параметры одной пластины
    this.plate = {};
    this.plate.width = 90;
    this.plate.height = 15;
    // Переменные для корректной отрисовки и анимации
    this.duration = 1000 / 60;
    this.maxDuration = 1000 / 16;
    this.delay = 0;
    this.lastFrame = 0;
    this.now = performance.now();
    // this.state = true;
    // this.stateScrollMap = false;  // Нужен для отслеживания другими классами состояния скроллинга
    this.state.stateGenerateNewMap = false; // Нужен для отслеживания другими классами момента когда надо добавить к своей карте вновь сгенерированный кусок this.state.newPlates
    // Настройки генерации карты
    this.koefGeneratePlates = 0.01;
    this.koefHeightOfMaxGenerateSlice = 2000;
    this.leftIndent = 91;
    this.rightIndent = 91;
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
    this.state.idPhysicBlockCounter = {};
    this.state.idPhysicBlockCounter.idPhys = 0;
    this.state.added = true;
    this.state.plates = genMap((this.canvasHeight - 20), this.koefHeightOfMaxGenerateSlice, this.koefGeneratePlates * this.koefHeightOfMaxGenerateSlice, this.state.idPhysicBlockCounter);
    this.state.idPhysicBlockCounter.Phys += 1;
    this.setPlayerOnPlate(this.state.plates[0]);
    this.physics.setState(this.state);
    this.score.setState(this.state);

    setTimeout(
      () => {
        gameBus.trigger('game_start', this.state);
      },
    );
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
      // this.mapController();
      this.state.commands = [{
        idP: 0,
        direction: '',
        delay: this.delay,
      },
      ];
      this.state = this.physics.engine();
      this.score.renderScore();
      delete this.state.commands;
      gameBus.trigger('state_changed', this.state);
    }
    if (this.state.players[0].y - this.state.players[0].height > this.canvasHeight) {
      setTimeout(() => {
        GlobalBus.trigger('game_score', { score: this.score.score });
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
      // this.mapController();

      this.state.commands = [{
        idP: 0,
        direction: 'LEFT',
        delay: this.delay,
      },
      ];
      this.state = this.physics.engine();
      this.score.renderScore();
      delete this.state.commands;

      this.scene.setState(this.state);
    }
  }

  onPressedRightControl(evt) {
    if (this.pressed('RIGHT', evt)) {
      this.now = performance.now();
      this.delay = this.now - this.lastFrame;
      this.lastFrame = this.now;
      // this.mapController();

      this.state.commands = [{
        idP: 0,
        direction: 'RIGHT',
        delay: this.delay,
      },
      ];
      this.state = this.physics.engine();
      this.score.renderScore();
      delete this.state.commands;

      this.scene.setState(this.state);
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

  destroy() {
    super.destroy();
    cancelAnimationFrame(this.gameloopRequestId);
  }
}
