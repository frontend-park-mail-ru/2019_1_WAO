export default class Fizic {
  constructor(state, canvas) {
    this.canvas = canvas;
    this.state = state;
    this.state.plates = [];
    this.gravite = 9.8;
    this.ejection = 1;
  }

  // Доп сервисы

  sortFuncPlates(a, b) {
    return b.y - a.y;
  }


  // Установка объектов

  setPlates(plates) {
    if (!this.state.plates) {
      this.state.plates = plates;
      this.state.plates.sort(this.sortFuncPlates);
    } else {
      console.error("You have already set plates!");
    }
  }

  setPlayer(me) {
    if (!this.state.me) {
      this.state.me = me;
    } else {
      console.error("You have already set player!");
    }
  }

  pushPlates(plates) {
    this.state.plates.push(plates);
    this.state.plates.sort(this.sortFuncPlates);
  }

  // Функции для просчета составляющих позиции игрока

  #forseCounter(obj) {
    return obj.mass*this.gravite - obj.velo*this.ejection;
  }

  #accelerationCounter(obj) {
    return this.#forseCounter(obj)/obj.mass;
  }

  // Обработка коллизий

  collision() {
    for (const plateIndex in this.plates) {
      if (Object.prototype.hasOwnProperty.call(this.field, plateIndex)) {
        const plate = this.field[plateIndex];
        if (this.state.me.dy >= 0) {
          if (this.state.me.x >= plate.x && this.state.me.x <= plate.x + plate.width) {
            if (this.state.me.y + dy < plate.y) {
              break;
            } else {
              if (this.state.me.y + dy > plate.y && this.state.me.y + dy <= plate.y + plate.height && this.state.me.y <= plate.y ) {
                me.y = plate.y;
              }
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

  }

  engine(delay) {
    // this.scoreCounter();
    // this.scoreShow();
    this.circleDraw();
    this.collision();
    this.jump(delay);
    this.gravitation(delay);
    return this.state;
  }

}