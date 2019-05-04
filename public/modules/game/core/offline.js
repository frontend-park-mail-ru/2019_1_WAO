import GameCore from './index';
import { gameBus } from '../../eventbus';
import Physics from './physics';

export default class OfflineGame extends GameCore {
  constructor(controller, scene) {
    super(controller, scene);

    this.state = {};
    this.gameloop = this.gameloop.bind(this);
    this.gameloopRequestId = null;

    this.player = new Physics(this.state, scene.giveCanvas());
    // this.player.init();
    this.duration = 1000 / 60;
    this.maxDuration = 1000 / 16;
    this.delay = 0;
    this.lastFrame = 0;
    this.now = performance.now();
    // Скроллинг карты
    this.maxScrollHeight = 0.25 * this.scene.giveCanvas().height;
    this.minScrollHeight = 0.75 * this.scene.giveCanvas().height;
    this.idPhysicBlockCounter = 0;
    this.state = true;
    this.stateScrollMap = false;  // Нужен для отслеживания другими классами состояния скроллинга
    this.stateGenerateNewMap = false; // Нужен для отслеживания другими классами момента когда надо добавить к своей карте вновь сгенерированный кусок this.state.newPlates
    // Настройки генерации карты
    this.koefGeneratePlates = 0.02;
  }
  // Генератор карты

  genMap(beginY, b = (this.scene.giveCanvas().height - 20) - 20, k = 10) {
    const newBlocks = [];
    const p = b / k; // Плотность
    let currentX;
    let currentY = beginY;
    for (let i = 0; i < k; i++) {
      currentX = Math.random() * (this.scene.giveCanvas().width - 91 - 91) + 91;
      newBlocks.push({
        x: currentX,
        y: currentY,
        dy: 0,
        idPhys: this.idPhysicBlockCounter++,
      });
      currentY -= p;
    }
    return newBlocks;
  }

  // Скроллинг карты
  mapController() {
    if (this.state.me.y <= this.maxScrollHeight && this.stateScrollMap === false) {
      this.stateScrollMap = true; // Начался скроллинг

      this.state.newPlates = this.genMap((this.state.plates[this.state.plates.length - 1].y - 20), (2000 + this.state.plates[this.state.plates.length - 1].y), (0.02 * (2000 + this.state.plates[this.state.plates.length - 1].y)).toFixed());  //  ~~(0.02 * Math.abs(-1000 - this.state.plates[this.state.plates.length - 1].y))
      Array.prototype.push.apply(this.state.plates, this.state.newPlates);
      // Очистить this.state от старых элементов
      for (let i = 0; i < this.state.plates.length; i++) {
        if (this.state.plates[i].y > this.scene.giveCanvas().height) {
          this.state.plates.splice(i, 1);
          i--;
        }
      }

      this.state.added = false;
      // this.state.plates.push(this.state.newPlates);
      this.stateGenerateNewMap = true;
      for (const plate of this.state.plates) {
        plate.dy = 0.5;
      }
      this.state.me.dy += 0.5;
    } else if (this.state.me.y > this.minScrollHeight && this.stateScrollMap === true) {
      this.stateScrollMap = false; // Закончился скроллинг
      this.stateGenerateNewMap = false;
      for (const plate of this.state.plates) {
        plate.dy = 0;
      }
      this.state.me.dy -= 0.5;
    }
  }

  setPlayerOnPlate(plate) {
    this.state.me.y = plate.y - 15;
    this.state.me.x = plate.x + 90 / 2;
  }

  start() {
    super.start();
    this.state = {
      me: {
        x: 0,
        y: 0,
        dx: 0.2,
        dy: 0.002,
        width: 50,
        height: 40,
      },
    };
    this.state.plates = this.genMap((this.scene.giveCanvas().height - 20), 2000, 0.02 * 2000);
    // this.state.plates = this.genMap((this.state.plates[this.state.plates.length - 1].y - 20), (2000 + this.state.plates[this.state.plates.length - 1].y), (0.02 * (2000 + this.state.plates[this.state.plates.length - 1].y)).toFixed());
    this.setPlayerOnPlate(this.state.plates[0]);
    this.player.setState(this.state);

    setTimeout(
      () => {
        gameBus.trigger('game_start', this.state);
      },
    );
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
      this.state = this.player.engine(this.delay);
      console.log(this.state.plates);
      gameBus.trigger('state_changed', this.state);
      if (this.stateGenerateNewMap === true) {
        this.state.added = true;
        delete this.state.newPlates;
      }
    }
    if (this.state.me.y - this.state.me.height > this.scene.giveCanvas().height) {
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
      this.state = this.player.moveLeft(this.delay);
      console.log('LEFT!!!!', this.state.me);
      this.scene.setState(this.state);
      if (this.stateGenerateNewMap === true) {
        this.state.added = true;
        delete this.state.newPlates;
      }
      // this.scene.moveLeft(evt);
    }
  }

  onPressedRightControl(evt) {
    if (this.pressed('RIGHT', evt)) {
      this.now = performance.now();
      this.delay = this.now - this.lastFrame;
      this.lastFrame = this.now;
      this.mapController();
      this.state = this.player.moveRight(this.delay);
      console.log('RIGHT!!!!', this.state.me);
      this.scene.setState(this.state);
      if (this.stateGenerateNewMap === true) {
        this.state.added = true;
        delete this.state.newPlates;
      }
    }
  }

  onGameStarted(state) {
    this.controller.start(); // начинаем слушать события нажатий клавиш
    this.scene.init(state); //
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
