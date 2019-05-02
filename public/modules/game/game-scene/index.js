/* eslint-disable no-unused-vars */
import Scene from '../../graphics/scene';
import FadingBlock from './fading-block';
import GamePlayerFigure from './player';
import Circle from '../../graphics/circle';
import BlockPlate from './block';
import { gameBus } from '../../eventbus';

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
    this.local = {};
    this.local.field = [];
    this.local.me = null;

    this.renderScene = this.renderScene.bind(this);

    this.duration = 1000 / 60;
    gameBus.on('game_close', this.stop);
    /*
this.local.me.x , y, // Значения на момент рендеринге
xConst, yConst, // Значения при init()
jumpHeight, jumpLength, jumpPressed, //переменные для смещения по У - организовывают прыжок
dltX, dltY // Значение смещения для сдвига
*/
  }

  init(state) {
    const { ctx } = this;
    const { scene } = this;

    this.state = state;
    // инициализация пластин для рендеринга
    this.local.field = this.state.plates.map((item) => {  // this.local.field = [{},{}]
      const b = new FadingBlock(ctx);
      b.id = scene.push(b);

      b.height = 15;
      b.width = 90;
      b.x = item.x;
      b.y = item.y;

      return b;
    });
    // инициализация игроков для рендеринга
    this.local.me = new GamePlayerFigure(ctx);

    this.local.me.x = this.state.me.x;
    this.local.me.y = this.state.me.y;
    // this.local.me.score = this.canvas.height - this.local.me.y;

    this.local.me.id = scene.push(this.local.me);
    // this.local.me.jumpCount = 0;

    // Для игры
    // this.local.me.jumpHeight = 0;
    // this.local.me.jumpLength = 100;
    // this.local.me.jumpPressed = true;

    this.local.me.dy = this.state.me.dy; // Вверх
    this.local.me.dx = this.state.me.dx;
    // this.local.me.collision = false;
    // this.gravity = 0.1;

    // this.outScore = document.getElementsByClassName('game-score')[0];
  }

  giveCanvas() {
    return this.canvas;
  }

  setState(state) {
    const { scene } = this;
    this.state = state;
    this.local.me.x = this.state.me.x;
    this.local.me.y = this.state.me.y;
    console.log(this.local.me.x, this.local.me.y);
    

    // this.local.me.y = state.me.y - 10;
  }

  moveLeft(evt) {
    // this.local.me.moveLeft = true;
    this.local.me.x -= 3;
    // scene.remove(this.s)
    // this.requestFrameId = requestAnimationFrame(this.renderScene);
  }

  moveRight(evt) {
    // this.local.me.moveLeft = true;
    this.local.me.x += 3;
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
    let delay = now - this.lastFrameTime;

    this.lastFrameTime = now;
    scene.render();
    this.requestFrameId = requestAnimationFrame(this.renderScene);


    // отрисовка движений влево -вправо
    // if (this.local.me.moveLeft) {
    //  this.local.me.x -= 3;
    // }
    // Логика прыжка
    /*
if (this.local.me.jumpPressed) {
this.local.me.jumpCount++;
this.local.me.jumpHeight =
-4 *
this.local.me.jumpLength *
Math.sin((Math.PI * this.local.me.jumpCount) / this.local.me.jumpLength);
}
if (this.local.me.jumpCount > this.local.me.jumpLength) {
this.local.me.jumpCount = 0;
this.local.me.jumpPressed = false;
this.local.me.jumpHeight = 0;
}
if (this.local.me.jumpPressed === false) this.local.me.jumpPressed = true;
this.local.me.y = this.local.me.jumpHeight + 600;
*/

    // ------- //
    // this.engine(delay);
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
