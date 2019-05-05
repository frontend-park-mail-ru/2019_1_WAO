
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
  }

  // Обработка коллизий

  collision(delay) {
    const plate = this.selectNearestBlock();
    if (!plate) {
      return;
    }
    if (this.state.me.dy >= 0) {
      if (this.state.me.y + this.state.me.dy * delay < plate.y - 15) {
        return;
      }
      this.state.me.statePlateUnderMe = true;
      this.setPlayerOnPlate(plate);
      this.jump(delay);
    }
  }

  // Вспомогательная функция для функции коллизии
  // Ищет ближайший по игру блок под игроком
  selectNearestBlock() {
    let nearestBlock;
    let minY = this.canvas.height;
    for (const plate of this.state.plates) {
      if ((this.state.me.x + this.state.me.width >= plate.x && this.state.me.x <= plate.x + 90)) {
        if ((plate.y - this.state.me.y < minY && this.state.me.y <= plate.y)) {
          minY = plate.y - this.state.me.y;
          nearestBlock = plate;
        }
      }
    }
    return nearestBlock;
  }

  // Отрисовка по кругу

  circleDraw() {
    if (this.state.me.x > this.canvas.width) {
      this.state.me.x = 0;
    } else if (this.state.me.x < 0) {
      this.state.me.x = this.canvas.width;
    }
  }

  // функции для прыжка

  setPlayerOnPlate(plate) {
    this.state.me.y = plate.y - 15;
  }

  jump() {
    this.state.me.dy = -0.35;
    if (this.state.plates[0].dy !== 0) {
      this.state.me.dy = -0.35 + this.state.plates[0].dy;
    } 
  }

  // функции изменения скорости

  processSpeed(delay) {
    this.state.me.dy += (this.gravity * delay);
  }

  // Сдвиг персонажа вниз

  move(delay) {
    this.state.me.y += (this.state.me.dy * delay);
  }

  // Сдвиг все карты вниз

  scrollMap(delay) {
    for (const plate of this.state.plates) {
      plate.y += plate.dy * delay;
    }
  }

  // Контролеры карты

  moveLeft(delay) {
    this.circleDraw();

    this.state.me.x -= this.state.me.dx * delay;
    this.processSpeed(delay);
    this.collision(delay);
    if (this.state.plates[0].dy !== 0) {
      this.scrollMap(delay);
    }
    this.move(delay);
    return this.state;
  }

  moveRight(delay) {
    this.circleDraw();
    this.state.me.x += this.state.me.dx * delay;
    this.processSpeed(delay);
    this.collision(delay);
    if (this.state.plates[0].dy !== 0) {
      this.scrollMap(delay);
    }
    this.move(delay);
    return this.state;
  }


  engine(delay) {
    this.circleDraw();
    this.processSpeed(delay);
    this.collision(delay);
    if (this.state.plates[0].dy !== 0) {
      this.scrollMap(delay);
    }
    this.move(delay);
    return this.state;
  }
}
