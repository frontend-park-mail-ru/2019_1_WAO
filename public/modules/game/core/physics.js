import { blockParams } from 'handlebars';

export default class Fizic {
  constructor(state, canvas) {
  // передаваемые данные
    this.canvas = canvas;
    this.state = state;
    // Объявляемые переменные
    this.state.plates = [];
    this.state.me = {
      statePlateUnderMe: false, // Игрок на пластине
      stateLastPlateUnderMe: false, // Игрок на прошлом кадре был на пластине
      dx: 0.2,
      dy: 0.002,
      x: 0,
      y: 0,
    };

    // Постоянные для прыжка
    this.gravity = 0.0004;
    this.moveSides = 1;
  }

  // Доп сервисы

  static sortFuncPlates(a, b) {
    return b.y - a.y;
  }


  // Установка объектов

  setState(state) {
    this.state = state;
    this.state.plates.sort(this.sortFuncPlates);
  }

  setPlates(plates) {
    if (!this.state.plates) {
      this.state.plates = plates;
      this.state.plates.sort(this.sortFuncPlates);
    } else {
      console.error('You have already set plates!');
    }
  }

  setPlayer(me) {
    if (!this.state.me) {
      this.state.me = me;
    } else {
      console.error('You have already set player!');
    }
  }

  pushPlates(plates) {
    this.state.plates.push(plates);
    this.state.plates.sort(this.sortFuncPlates);
  }

  // Функции для просчета составляющих позиции игрока


  // Обработка коллизий

  collision(delay) {
    const plate = this.selectNearestBlock();
  
    if (this.state.me.dy >= 0) {
      if (this.state.me.y + this.state.me.dy * delay < plate.y - 15) {
        // if (this.breakY !== plate.y) {
        //   this.breakY = plate.y;
        // alert("Break " + plate.y);
        // }

        return;
      } // else if (
      // (this.state.me.y + this.state.me.dy * delay > plate.y - 15  // Если следующее положение игрока ниже платформы
      // && this.state.me.y <= plate.y)
      // || (this.state.me.y <= plate.y     // this.state.me.y + this.state.me.dy * delay <= plate.y // Или если выше чем низ платформы
      // && this.state.me.y + this.state.me.dy * delay >= plate.y)
      // && this.state.me.y  <= plate.y
      // )
      // {
      // alert("First: " + (this.state.me.y + this.state.me.dy * delay > plate.y && this.state.me.y <= plate.y) + " Second: " + (this.state.me.y <= plate.y && this.state.me.y + this.state.me.dy * delay >= plate.y + 15));
      alert(plate);
      this.state.me.statePlateUnderMe = true;
      this.setPlayerOnPlate(plate);
      this.jump(delay);
      // console.log(this.state.me.dy);
      // }
    }
  }

  // Отрисовка по кругу

  circleDraw() {
    if (this.state.me.x > this.canvas.width) {
      this.state.me.x = 0;
    } else if (this.state.me.x < 0) {
      this.state.me.x = this.canvas.width;
    }
  }

  selectNearestBlock() {
    let nearestBlock;
    let minY;
    for (const plateIndex in this.state.plates) {
      if (Object.prototype.hasOwnProperty.call(this.state.plates, plateIndex)) {
        const plate = this.state.plates[plateIndex];
        if (this.state.me.x + this.state.me.width >= plate.x && this.state.me.x <= plate.x + 90) {
          if (plate.y - this.state.me.y < minY && this.state.me.y <= plate.y) {
            minY = plate.y - this.state.me.y;
            nearestBlock = plate;
          }
        }
      }
    }
    return nearestBlock;
  }

  setPlayerOnPlate(plate) {
    this.state.me.y = plate.y - 15;
  }

  jump(delay) {
    this.state.me.dy = -0.35;
  }

  processSpeed(delay) {
    this.state.me.dy += (this.gravity * delay);
  }


  move(delay) {
    this.state.me.y += (this.state.me.dy * delay);
  }

  moveLeft(delay) {
    this.circleDraw();

    this.state.me.x -= this.state.me.dx * delay;
    this.processSpeed(delay);
    this.collision(delay);
    this.move(delay);
    // this.gravitation(delay);
    return this.state;
  }

  moveRight(delay) {
    this.circleDraw();
    this.state.me.x += this.state.me.dx * delay;
    this.processSpeed(delay);
    this.collision(delay);
    this.move(delay);
    // this.gravitation(delay);
    return this.state;
  }


  engine(delay) {
    this.circleDraw();
    this.processSpeed(delay);
    this.collision(delay);
    this.move(delay);
    // this.gravitation(delay);
    return this.state;
  }
}
