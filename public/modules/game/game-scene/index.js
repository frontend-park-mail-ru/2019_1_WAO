/* eslint-disable no-unused-vars */
import Scene from '../../graphics/scene';
import FadingBlock from './fading-block';
import GamePlayerFigure from './player';
import Circle from '../../graphics/circle';
import BlockPlate from './block';

const grav = 10;

const KEYS = {
  FIRE: [' ', 'Enter'],
  LEFT: ['a', 'A', 'ф', 'Ф', 'ArrowLeft'],
  RIGHT: ['d', 'D', 'в', 'В', 'ArrowRight'],
};

export default class GameScene {
  constructor(canvas) {
    this.canvas = canvas;
    const ctx = canvas.getContext('2d');
    this.ctx = ctx;
    this.scene = new Scene(ctx);
    this.state = null;
    this.keys = {
      arrowleft: false,
      arrowright: false,
    };
    this.requestFrameId = null;

    this.lastFrameTime = 0;

    this.field = [];
    this.me = null;

    this.renderScene = this.renderScene.bind(this);

    /*
this.me.x , y, // Значения на момент рендеринге
xConst, yConst, // Значения при init()
jumpHeight, jumpLength, jumpPressed, //переменные для смещения по У - организовывают прыжок
dltX, dltY // Значение смещения для сдвига
*/
  }

  init(state) {
    const { ctx } = this;
    const { scene } = this;

    this.state = state;

    this.field = this.state.plates.map((item) => {
      const b = new FadingBlock(ctx);
      b.id = scene.push(b);

      b.height = 15;
      b.width = 90;
      b.x = item.x;
      b.y = item.y;

      return b;
    });
    this.me = new GamePlayerFigure(ctx);

    // this.me.y = 660 + state.me.y;
    // this.me.x = 50 + state.me.x;
    this.me.x = 250;
    this.me.y = 500;
    this.me.score = this.canvas.height - this.me.y;

    this.me.id = scene.push(this.me);
    this.me.jumpCount = 0;

    // Для игры
    // this.me.jumpHeight = 0;
    // this.me.jumpLength = 100;
    // this.me.jumpPressed = true;

    this.me.dy = 0; // Вверх
    this.me.dx = 0;
    this.me.collision = false;
    this.gravity = 0.1;

    // this.outScore = document.getElementsByClassName('game-score')[0];
  }

  giveCanvas() {
    return this.canvas;
  }

  setState(state) {
    const { scene } = this;
    this.state = state;

    // this.me.y = state.me.y - 10;
  }

  moveLeft(evt) {
    // this.me.moveLeft = true;
    this.me.x -= 3;
    // scene.remove(this.s)
    // this.requestFrameId = requestAnimationFrame(this.renderScene);
  }

  moveRight(evt) {
    // this.me.moveLeft = true;
    this.me.x += 3;
    // scene.remove(this.s)
    // this.requestFrameId = requestAnimationFrame(this.renderScene);
  }

  engine(delay) {
    // this.scoreCounter();
    // this.scoreShow();
    // this.circleDraw();
    // this.upgrCollision();
    // this.jump(delay);
    // this.gravitation(delay);
  }

  renderScene(now) {
    const { ctx } = this;
    const { scene } = this;
    const delay = now - this.lastFrameTime;
    // отрисовка движений влево -вправо
    // if (this.me.moveLeft) {
    //  this.me.x -= 3;
    // }
    // Логика прыжка
    /*
if (this.me.jumpPressed) {
this.me.jumpCount++;
this.me.jumpHeight =
-4 *
this.me.jumpLength *
Math.sin((Math.PI * this.me.jumpCount) / this.me.jumpLength);
}
if (this.me.jumpCount > this.me.jumpLength) {
this.me.jumpCount = 0;
this.me.jumpPressed = false;
this.me.jumpHeight = 0;
}
if (this.me.jumpPressed === false) this.me.jumpPressed = true;
this.me.y = this.me.jumpHeight + 600;
*/

    // ------- //
    this.engine(delay);
    this.lastFrameTime = now;
    scene.render();

    this.requestFrameId = requestAnimationFrame(this.renderScene);
  }

  start() {
    this.lastFrameTime = performance.now();
    this.requestFrameId = requestAnimationFrame(this.renderScene);
  }

  stop() {
    if (this.requestFrameId) {
      window.cancelAnimationFrame(this.requestFrameId);
      this.requestFrameId = null;
    }

    this.scene.clear();
  }
}
