
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
    let player = this.foundPlayer(command.idP);
    const plate = this.selectNearestBlock(player);
    if (!plate) {
      return;
    }
    if (player.dy >= 0) {
      if (player.y + player.dy * command.delay < plate.y - 15) {
        return;
      }
      player.statePlateUnderMe = true;
      // this.setPlayerOnPlate(player, plate);
      player.y = plate.y - 15;
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

  // setPlayerOnPlate(player, plate) {
  //   player.y = plate.y - 15;
  // }

  jump(player) {
    player.dy = -0.35;
    if (this.state.plates[0].dy !== 0) {
      player.dy = -0.35 + this.state.plates[0].dy;
    }
  }

  // функции изменения скорости

  processSpeed(command) {
    let i = 0;
    for (;i < this.state.players.length; i++) {
      if (this.state.players[i].idP === command.idP) {
        let player = this.state.players[i];
        console.log(player);
        player.dy += (this.gravity * command.delay);
        return;
      }
    }
  }

  // Сдвиг персонажа вниз

  move(command) {
    let player = this.foundPlayer(command.idP);
    player.y += (player.dy * command.delay);
  }

  // Сдвиг все карты вниз

  scrollMap(delay) {  // Работает только для текущего игрока
    for (const plate of this.state.plates) {
      plate.y += plate.dy * delay;
    }
    if (this.mapGapSpeed !== 0) {
      this.mapGap += this.mapGapSpeed * delay;
    }
  }

  // Поиск игрока по idP
  foundPlayer(id) {
    let i = 0;
    for (;i < this.state.players.length; i++) {
      if (this.state.players[i].idP === id) {
        return this.state.players[i];
      }
    }
    return undefined;
  }
  // foundPlayer(idP) {
    
  //   let out = this.state.players.filter((player) => {
  //     return player.idP === idP;
  //   });
  //   return out;
  //   // alert(out);
  // }

  // Контролеры карты

  /*
  Command: id, "LEFT", delay
  */

  engine() {
    this.circleDraw();
    this.state.commands.forEach((command) => {
      let player = this.foundPlayer(command.idP);
      if (command.direction === 'LEFT') {
        player.x -= player.dx * command.delay;
      } else if (command.direction === 'RIGHT') {
        player.x += player.dx * command.delay;
      }
      this.processSpeed(command);
      this.collision(command);
    });
    if (this.state.plates[0].dy !== 0) {
      this.scrollMap(this.state.commands[0].delay);
    }
    this.state.commands.forEach((command) => {
      this.move(command);
    });
    return this.state;
  }
}
