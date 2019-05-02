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

    this.duration = 1000 / 60;
    this.maxDuration = 1000 / 16;
    this.delay = 0;
    this.lastFrame = 0;
    this.now = performance.now();
  }

  start() {
    super.start();
    this.state = {
      plates: [
        { x: 50, y: 100 },
        { x: 250, y: 445 },
        { x: 100, y: 305 },
        { x: 350, y: 205 },
        { x: 35, y: 565 },
        { x: 330, y: 685 },
      ],
      me: {
        x: 150,
        y: 100,
        dx: 0.2,
        dy: 0.002,
        width: 50,
        height: 40,
      },
    };
    this.player.setState(this.state);

    // this.player.setPlates([
    // { x: 50, y: 100 },
    // { x: 250, y: 445 },
    // { x: 100, y: 305 },
    // { x: 350, y: 205 },
    // { x: 35, y: 565 },
    // { x: 230, y: 685 },
    // ]);

    // this.player.setPlayer({
    // x: 150,
    // y: 600,
    // dx: 0,
    // dy: 0,
    // });

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

      this.state = this.player.engine(this.delay);
      console.log(this.state.me);
      gameBus.trigger('state_changed', this.state);
    }
    if (this.state.me.y - this.state.me.height > this.scene.giveCanvas().height) {
      setTimeout(() => {
        gameBus.trigger('game_finish');
      });
    }
  }

  onPressedLeftControl(evt) {
    if (this.pressed('LEFT', evt)) {
      this.now = performance.now();
      this.delay = this.now - this.lastFrame;
      this.lastFrame = this.now;
      this.state = this.player.moveLeft(this.delay);
      console.log('LEFT!!!!', this.state.me);
      this.scene.setState(this.state);
      // this.scene.moveLeft(evt);
    }
  }

  onPressedRightControl(evt) {
    if (this.pressed('RIGHT', evt)) {
      this.now = performance.now();
      this.delay = this.now - this.lastFrame;
      this.lastFrame = this.now;
      this.state = this.player.moveRight(this.delay);
      console.log('RIGHT!!!!', this.state.me);
      this.scene.setState(this.state);
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
