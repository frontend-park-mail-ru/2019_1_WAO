import GameCore from './index';
import { gameBus } from '../../eventbus';
import Physics from './physics';

export default class OfflineGame extends GameCore {
  constructor(controller, scene) {
    super(controller, scene);

    this.state = {};
    this.gameloop = this.gameloop.bind(this);
    this.gameloopRequestId = null;
    this.lastFrame = 0;

    this.player = new Physics(this.state, scene.giveCanvas());
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
        { x: 230, y: 685 },
      ],
      me: {
        x: 150,
        y: 600,
        dx: 0,
        dy: 0,
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

  gameloop(now) {
    const delay = now - this.lastFrame;
    this.lastFrame = now;

    gameBus.trigger('state_changed', this.state);

    this.gameloopRequestId = requestAnimationFrame(this.gameloop);
  }

  onPressedLeftControl(evt) {
    console.log(this.scene.moveLeft);
    if (this.pressed('LEFT', evt)) {
      this.scene.moveLeft(evt);
    }
  }

  onPressedRightControl(evt) {
    if (this.pressed('RIGHT', evt)) {
      this.scene.moveRight(evt);
    }
  }

  onGameStarted(evt) {
    this.controller.start(); // начинаем слушать события нажатий клавиш
    this.scene.init(evt); //
    this.scene.start();

    this.lastFrame = performance.now();
    this.gameloopRequestId = requestAnimationFrame(this.gameloop);
  }

  onGameFinished() {
    cancelAnimationFrame(this.gameloopRequestId);
    gameBus.trigger('game_close');
  }

  onGameStateChanged(evt) {
    this.scene.setState(evt);
  }
}
