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

    this.stateAddedMap = true;

    gameBus.on('game_close', this.stop);
  }

  init(state) {
    const { ctx } = this;
    const { scene } = this;

    this.state = state;
    // инициализация пластин для рендеринга
    this.local.field = this.state.plates.map((item) => {
      const b = new FadingBlock(ctx);
      b.id = scene.push(b);
      // scene.backView(b.id);
      b.height = 15;
      b.width = 90;
      b.x = item.x;
      b.y = item.y;
      // b.dy = item.dy;
      b.idPhys = item.idPhys;

      return b;
    });
    // инициализация игроков для рендеринга
    this.local.players = [];
    for (const Lplayer of this.state.players) {
      const player = new GamePlayerFigure(ctx);

      player.x = Lplayer.x;
      player.y = Lplayer.y;
      player.dx = Lplayer.dx;
      player.idP = Lplayer.idP;
      player.id = scene.push(player);

      this.local.players.push(player);
    }


    // this.local.me = new GamePlayerFigure(ctx);

    // this.local.me.x = this.state.me.x;
    // this.local.me.y = this.state.me.y;
    // this.local.me.dx = this.state.me.dx;

    // this.local.me.id = scene.push(this.local.me);
  }

  giveCanvas() {
    return this.canvas;
  }

  foundPlayer(id) {
    let i = 0;
    for (;i < this.state.players.length; i++) {
      if (this.state.players[i].idP === id) {
        return this.state.players[i];
      }
    }
    return undefined;
  }

  foundPlayerInLocal(id) {
    let i = 0;
    for (;i < this.local.players.length; i++) {
      if (this.local.players[i].idP === id) {
        return this.local.players[i];
      }
    }
    return undefined;
  }

  deletePlayer(id) {
    this.scene.remove(this.foundPlayerInLocal(id));
  }
  // foundPlayer(idP) {
  //   return this.state.players.filter((player) => {
  //     return player.idP === idP;
  //   })[0];
  // }

  setState(state) {
    const { scene } = this;
    this.state = state;

    this.local.players.forEach((Lplayer) => {
      const player = this.foundPlayer(Lplayer.idP);
      Lplayer.x = player.x;
      Lplayer.y = player.y;
      Lplayer.idP = player.idP;
    });

    if (this.state.plates[0].dy !== 0) {
      for (const plate of this.state.plates) {
        for (let i = 0; i < this.local.field.length; i++) {
          if (this.local.field[i].idPhys === plate.idPhys) {
            this.local.field[i].y = plate.y;
            break;
          }
        }
      }
      if (this.state.newPlates) {
        // for (let i = 0; i < this.local.field.length; i++) {
        //   if (this.local.field[i].y > this.canvas.height) {
        //     this.scene.remove(this.local.field[i].id);
        //     this.local.field.splice(i, 1);
        //     i--;
        //   }
        // }
        for (let lPlate of this.state.newPlates) {
          let b = new FadingBlock(this.ctx);
          b.id = scene.push(b);
          // scene.backView(b.id);
          b.height = 15;
          b.width = 90;
          b.x = lPlate.x;
          b.y = lPlate.y;
          b.idPhys = lPlate.idPhys;
          this.local.field.push(b);
        }
      }
    }
  }

  renderScene(now) {
    const { ctx } = this;
    const { scene } = this;
    const delay = now - this.lastFrameTime;

    this.lastFrameTime = now;
    scene.render();
    this.requestFrameId = requestAnimationFrame(this.renderScene);
  }

  start() {
    this.lastFrameTime = performance.now();
    this.requestFrameId = requestAnimationFrame(this.renderScene);
  }

  destroy() {
    console.log("GameScene");
    if (this.requestFrameId) {
      window.cancelAnimationFrame(this.requestFrameId);
      this.requestFrameId = null;
    }

    this.scene.clear();
  }
}
