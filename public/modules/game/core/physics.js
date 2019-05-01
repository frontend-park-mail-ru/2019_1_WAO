export default class Fizic {
  constructor(state, canvas) {
  // передаваемые данные
    this.canvas = canvas;
    this.state = state;
    // Объявляемые переменные
    this.state.plates = [];
    this.state.me.statePlateUnderMe = false; // Игрок на пластине
    this.state.me.stateLastPlateUnderMe = false; // Игрок на прошлом кадре был на пластине

    this.state.me.dx = 0;
    this.state.me.dy = 0;

    // Постоянные для прыжка
    this.gravite = 9.8;
    this.moveSides = 1;
  }

  // Доп сервисы

  static sortFuncPlates(a, b) {
    return b.y - a.y;
  }


  // Установка объектов

  setState(state) {
    if (!this.state) {
      this.state = state;
    }
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

  collision() {
    for (const plateIndex in this.plates) {
      if (Object.prototype.hasOwnProperty.call(this.field, plateIndex)) {
        const plate = this.field[plateIndex];
        if (this.state.me.dy >= 0) {
          if (this.state.me.x >= plate.x && this.state.me.x <= plate.x + plate.width) {
            if (this.state.me.y + this.state.me.dy < plate.y) {
              break;
            } else if (this.state.me.y + this.state.me.dy > plate.y && this.state.me.y + this.state.me.dy <= plate.y + plate.height && this.state.me.y <= plate.y) {
              this.state.me.statePlateUnderMe = true;
              this.state.me.y = plate.y;
            }
          }
        }
      }
    }
  }

  // Отрисовка по кругу

  circleDraw() {
    if (this.state.me.x > this.canvas.width) {
      this.state.me.x = 0;
    } else if (this.me.x < 0) {
      this.state.me.x = this.canvas.width;
    }
  }

  jump(delay) {
    if (this.state.statePlateUnderMe === true) { // пропустить 1 кадр после соударения с пластиной
      this.state.stateLastPlateUnderMe = true;
      this.state.statePlateUnderMe = false;

      // Все еще будет работать физика
    } else if (this.state.stateLastPlateUnderMe === true) { // Если я ударился о пластину, то вверх
      this.state.me.dy = 5;
    } else { // Если сейчас я не на пластине, то рассчитывай как обычно
      this.state.me.dy += this.gravite * delay;
    }
  }

  // moveLeft(delay) {
  // this.state.me.dx += this.moveSides * delay;
  // }


  engine(delay) {
  // this.scoreCounter();
  // this.scoreShow();
    this.circleDraw();
    this.collision();
    this.jump(delay);
    // this.gravitation(delay);
    return this.state;
  }
}
