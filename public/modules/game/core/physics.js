
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
  }

  // Обработка коллизий

  collision(command) {
    const player = this.foundPlayer(command.id);
    const plate = this.selectNearestBlock(player);
    if (!plate) {
      return;
    }
    if (player.dy >= 0) {
      if (player.y + player.dy * command.delay < plate.y - 15) {
        return;
      }
      player.statePlateUnderMe = true;
      this.setPlayerOnPlate(player, plate);
      this.jump(player);
    }
  }

  // Вспомогательная функция для функции коллизии
  // Ищет ближайший по игру блок под игроком
  selectNearestBlock(player) {
    let nearestBlock;
    let minY = this.canvas.height;
    for (const plate of this.state.plates) {
      if ((player.x + player.width >= plate.x && player.x <= plate.x + 90)) {
        if ((plate.y - player.y < minY && player.y <= plate.y)) {
          minY = plate.y - player.y;
          nearestBlock = plate;
        }
      }
    }
    return nearestBlock;
  }

  // Отрисовка по кругу

  circleDraw() {
    for (const player of this.state.players) {
      if (player.x > this.canvas.width) {
        player.x = 0;
      } else if (player.x < 0) {
        player.x = this.canvas.width;
      }
    }
  }

  // функции для прыжка

  setPlayerOnPlate(player, plate) {
    player.y = plate.y - 15;
  }

  jump(player) {
    player.dy = -0.35;
    if (this.state.plates[0].dy !== 0) {
      player.dy = -0.35 + this.state.plates[0].dy;
    }
  }

  // функции изменения скорости

  processSpeed(command) {
    const player = this.foundPlayer(command.id);
    player.dy += (this.gravity * command.delay);
  }

  // Сдвиг персонажа вниз

  move(command) {
    const player = this.foundPlayer(command.id);
    player.y += (player.dy * command.delay);
  }

  // Сдвиг все карты вниз

  scrollMap(delay) {
    for (const plate of this.state.plates) {
      plate.y += plate.dy * delay;
    }
  }

  // Поиск игрока по id

  foundPlayer(id) {
    return this.state.players.filter((player) => {
      player.id == id;
    })[0];
  }

  // Контролеры карты

  /*
  Command: id, "LEFT", delay
  */

  engine() {
    this.circleDraw();
    let command;
    for (command of this.state.commands) {
      let player = this.foundPlayer(command.id);
      if (command.direction === 'LEFT') {
        player.x -= player.dx * command.delay;
      } else if (command.direction === 'RIGHT') {
        player.x += player.dx * command.delay;
      }
      this.processSpeed(command);
      this.collision(command);
    }
    if (this.state.plates[0].dy !== 0) {
      this.scrollMap(this.state.players[0]);
    }
    for (const command of this.state.commands) {
      this.move(command);
    }
    return this.state;
  }
}
