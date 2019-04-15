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

    this.outScore = document.getElementsByClassName('game-score')[0];
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

  circleDraw() {
    if (this.me.x > this.canvas.width) {
      this.me.x = 0;
    } else if (this.me.x < 0) {
        this.me.x = this.canvas.width;
      }
  }

  scoreCounter() {
    if (this.canvas.height - this.me.y > this.me.score) {
      this.me.score = this.canvas.height - this.me.y;
    }
  }

  scoreShow() {
    this.outScore.innerHTML = ~~this.me.score;
  }

  collision() {
    // Пролетает через платформы
    if (this.me.dy >= 6) {
      this.me.dy = 6;
    }
    for (const plateIndex in this.field) {
      if (Object.prototype.hasOwnProperty.call(this.field, plateIndex)) {
        const plate = this.field[plateIndex];
        if (this.me.dy >= 0) {
          if (this.me.x >= plate.x && this.me.x <= plate.x + plate.width) {
            if (Math.abs(this.me.y - plate.y + plate.height) <= 3) {
              this.me.collision = true;
              break;
            }
          }
        }
      }
    }
  }

  collis(p1, p2, p3, p4) {
    const v1 = this.vector_mult(
      p4.x - p3.x,
      p4.y - p3.y,
      p1.x - p3.x,
      p1.y - p3.y,
    );
    const v2 = this.vector_mult(
      p4.x - p3.x,
      p4.y - p3.y,
      p2.x - p3.x,
      p2.y - p3.y,
    );
    const v3 = this.vector_mult(
      p2.x - p1.x,
      p2.y - p1.y,
      p3.x - p1.x,
      p3.y - p1.y,
    );
    const v4 = this.vector_mult(
      p2.x - p1.x,
      p2.y - p1.y,
      p4.x - p1.x,
      p4.y - p1.y,
    );
    if (v1 * v2 <= 0 && v3 * v4 <= 0) return true;
    return false;
  }

  // eslint-disable-next-line class-methods-use-this
  vector_mult(aX, aY, bX, bY) {
    return aX * aY - bX * bY;
  }

  upgrCollision() {
    for (const plateIndex in this.field) {
      if (Object.prototype.hasOwnProperty.call(this.field, plateIndex)) {
        const nextPlayerPosition = {};
        for (const key in this.me) {
          // остальные for in так же делай
          if (Object.prototype.hasOwnProperty.call(this.me, key)) {
            nextPlayerPosition[key] = this.me[key];
          }
        }
        nextPlayerPosition.y += this.me.dy + this.field[plateIndex].height;

        const Player = {};
        for (const key in this.me) {
          Player[key] = this.me[key];
        }
        Player.y += this.field[plateIndex].height;

        const plate1 = {};
        for (const key in this.field[plateIndex]) {
          plate1[key] = this.field[plateIndex][key];
        }
        plate1.x -= this.me.body.width;

        const plate2 = {};
        for (const key in this.field[plateIndex]) {
          plate2[key] = this.field[plateIndex][key];
        }
        plate2.x += this.field[plateIndex].width;

        if (this.collis(Player, nextPlayerPosition, plate1, plate2)) {
          this.me.collision = true;
        }
      }
    }
  }

  jump(delay) {
    if (this.me.collision === true) {
      this.me.dy = -6;
    }
    this.me.collision = false;
  }

  gravitation(delay) {
    this.me.y += this.me.dy;
    this.me.dy += this.gravity;
    // if (this.me.dy <= -3) this.me.dy = -this.me.dy;
    // if (this.me.dy >= 3) this.me.dy = -this.me.dy;
  }

  engine(delay) {
    this.scoreCounter();
    this.scoreShow();
    this.circleDraw();
    this.upgrCollision();
    this.jump(delay);
    this.gravitation(delay);
  }

  renderScene(now) {
    const { ctx } = this;
    const { scene } = this;
    const delay = now - this.lastFrameTime;
    // отрисовка движений влево -вправо
    // if (this.me.moveLeft) {
    // 	this.me.x -= 3;
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
