/* eslint-disable func-names */
/* eslint-disable no-unused-vars */
import Scene from '../../graphics/scene';
import FadingBlock from './fading-block';
import GamePlayerFigure from './player';
import Circle from '../../graphics/circle';
import BlockPlate from './block';
import { gameBus } from '../../eventbus';

import Sheep from './sheep';
import Grass from './grass';
import * as sheepImage from './sheep.png';
import * as grassImage from './grass.png';

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
    this.local.plates = {};
    this.local.me = null;

    this.renderScene = this.renderScene.bind(this);

    gameBus.on('game_close', this.stop);
  }

  init(state) {
    const { ctx } = this;
    const { scene } = this;

    this.state = state;
    // инициализация пластин для рендеринга
    let grassPicture =  new Image(90, 15);
    grassPicture.src = grassImage.default;
    Object.values(this.state.plates).forEach((elem) => {
      const b = new Grass(ctx, grassPicture);
      b.id = this.scene.push(b);
      b.height = 15;
      b.width = 90;
      b.x = elem.x;
      b.y = elem.y;
      b.idPhys = elem.idPhys;
      this.local.plates[elem.idPhys] = b;
    });

    // инициализация игроков для рендеринга
    let sheepPicture =  new Image(50, 40);
    sheepPicture.src = sheepImage.default;
    this.local.players = {};
    Object.values(this.state.players).forEach((Lplayer) => {
      const player = new Sheep(ctx, sheepPicture);
      player.x = Lplayer.x;
      player.y = Lplayer.y;
      player.dx = Lplayer.dx;
      player.id = this.scene.push(player);
      player.idP = Lplayer.idP;
      this.local.players[Lplayer.idP] = player;
    });
  }

  giveCanvas() {
    return this.canvas;
  }

  deletePlayer(id) {
    this.scene.remove(this.local.players[id]);
  }

  addNewPlatesOnCanvas(plates) {
    const { ctx } = this;
    Object.values(plates).forEach((elem) => {
      const b = new FadingBlock(ctx);
      b.id = this.scene.push(b);
      b.height = 15;
      b.width = 90;
      b.x = elem.x;
      b.y = elem.y;
      b.idPhys = elem.idPhys;
      this.local.plates[elem.idPhys] = b;
    });
  }

  setState(state) {
    const { scene } = this;
    this.state = state;
    // Неявная передача новый координат от 1го игрока другому
    Object.values(this.local.players).forEach((Lplayer) => {
      const player = this.state.players[Lplayer.idP];
      Lplayer.x = player.x;
      Lplayer.y = player.y;
    });

    if (this.state.plates[0].dy !== 0) {
      Object.values(this.state.plates).forEach((plate) => {
        this.local.plates[plate.idPhys].y = this.state.plates[plate.idPhys].y;
      });
    // console.log(this.state.newPlates);
    // if (this.state.newPlates.length !== 0) {
    //   // for (let i = 0; i < this.local.plates.length; i++) {
    //   //   if (this.local.plates[i].y > this.canvas.height) {
    //   //     this.scene.remove(this.local.plates[i].id);
    //   //     this.local.plates.splice(i, 1);
    //   //     i--;
    //   //   }
    //   // }
    //   this.state.newPlates.forEach(function(lPlate) {
    //     let b = new FadingBlock(ctx);
    //     b.id = scene.push(b);
    //     // scene.backView(b.id);
    //     b.height = 15;
    //     b.width = 90;
    //     b.x = lPlate.x;
    //     b.y = lPlate.y;
    //     b.idPhys = lPlate.idPhys;
    //     this.local.plates.push(b);
    //   });
    //   this.state.newPlates = [];
    // }
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
    console.log('GameScene');
    if (this.requestFrameId) {
      window.cancelAnimationFrame(this.requestFrameId);
      this.requestFrameId = null;
    }

    this.scene.clear();
  }
}
