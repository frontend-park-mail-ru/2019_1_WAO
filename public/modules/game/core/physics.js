/* eslint-disable no-plusplus */
/* eslint-disable max-len */
import { gameSettings } from '../gameConfig';
import { genMap } from './mapLogic';

export default class Fizic {
  constructor(state, canvas, score, multiplayer = false) {
  // передаваемые данные
    this.score = score;
    this.canvas = canvas;
    this.state = state;
    this.multiplayer = multiplayer;
    this.gameSettings = gameSettings;
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

    // Скроллинг карты
    this.koefGeneratePlates = 0.01;
    this.koefHeightOfMaxGenerateSlice = 2000;
    this.maxScrollHeight = 0.25 * 700;
    this.minScrollHeight = 0.75 * 700;
    this.koefScrollSpeed = 0.5; // Скорость с которой все объекты будут падать вниз
    this.stateScrollMap = false;
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
    // if (command.idP !== 0) {
    //   alert("1");
    // }
    const player = this.foundPlayer(command.idP);
    const plate = this.selectNearestBlock(player);
    if (!plate) {
      return;
    }
    if (player.dy >= 0) {
      if (player.y + player.dy * command.delay < plate.y - 15) {
        return;
      }
      // Если был включен счетчик очков, то передать в него пластину от которой будем прыгать
      if (this.score) {
        this.score.giveCurrentPlate(plate);
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
        const player = this.state.players[i];
        // console.log(player);
        player.dy += (this.gravity * command.delay);
        return;
      }
    }
  }

  // Сдвиг персонажа вниз

  move(command) {
    const player = this.foundPlayer(command.idP);
    player.y += (player.dy * command.delay);
  }

  // Сдвиг все карты вниз

  scrollMap(delay) {  // Работает только для текущего игрока
    for (const plate of this.state.plates) {
      plate.y += plate.dy * delay;
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

  // Определение координат самого нижнего игрока
  foundLowerPlayer() {
    let lowestY = this.state.players[0].y;
    this.state.players.forEach((elem) => {
      if (elem.y < lowestY) {
        lowestY = elem.y;
      }
    });
    return lowestY;
  }


  // Скроллинг карты
  mapControllerOnline() {
    // Игрок добрался до 3/4 экрана, то все плиты и игрок резко смещаются вниз пока игрок не окажется на 1/4 экрана
    if (this.state.players[0].y <= this.maxScrollHeight && this.state.stateScrollMap === false) {
      this.state.stateScrollMap = true; // Сигнал запрещающий выполнять этот код еще раз пока не выполнится else
      // this.socket.send(JSON.stringify({
      //   type: 'map',
      // }));
      // Очистить this.state от старых элементов
      const lowestY = this.foundLowerPlayer();
      for (let i = 0; i < this.state.plates.length; i++) {
        if (this.state.plates[i].y > this.canvasHeight && this.state.plates[i].y < lowestY) {
          this.state.plates.splice(i, 1);
          i--;
        }
      }
      // Задаем всем объектам скорость вниз
      this.state.plates.forEach((plate) => {
        plate.dy = this.koefScrollSpeed;
      });
      this.state.players.forEach((element) => {
        element.dy += this.koefScrollSpeed;
      });
    } else if (this.state.players[0].y > this.minScrollHeight && this.state.stateScrollMap === true) {
      this.state.stateScrollMap = false; // Закончился скроллинг
      for (const plate of this.state.plates) {
        plate.dy = 0;
      }
      this.state.players.forEach((element) => {
        element.dy -= this.koefScrollSpeed;
      });
    }
  }

  // Скроллинг карты
  mapControllerOfline() {
    // Игрок добрался до 3/4 экрана, то все плиты и игрок резко смещаются вниз пока игрок не окажется на 1/4 экрана
    if (this.state.players[0].y <= this.maxScrollHeight && this.stateScrollMap === false) {
      this.stateScrollMap = true; // Сигнал запрещающий выполнять этот код еще раз пока не выполнится else

      this.state.newPlates = genMap(
        (this.state.plates[this.state.plates.length - 1].y - 20),
        (this.koefHeightOfMaxGenerateSlice + this.state.plates[this.state.plates.length - 1].y),
        (this.koefGeneratePlates * (this.koefHeightOfMaxGenerateSlice + this.state.plates[this.state.plates.length - 1].y)).toFixed(),
        this.state.idPhysicBlockCounter,
      );
      this.state.idPhysicBlockCounter.Phys += 1;
      Array.prototype.push.apply(this.state.plates, this.state.newPlates);
      // Очистить this.state от старых элементов
      for (let i = 0; i < this.state.plates.length; i++) {
        if (this.state.plates[i].y > this.canvasHeight) {
          this.state.plates.splice(i, 1);
          i--;
        }
      }
      this.state.added = false; // Сигнал для index.js о том, что пора начать отрисовывать новый кусок карты и почистить старую
      this.state.stateGenerateNewMap = true;
      // Задаем всем объектам скорость вниз
      this.state.plates.forEach((plate) => {
        plate.dy = this.koefScrollSpeed;
      });
      this.state.players.forEach((element) => {
        element.dy += this.koefScrollSpeed;
      });
    } else if (this.state.players[0].y > this.minScrollHeight && this.stateScrollMap === true) {
      this.stateScrollMap = false; // Закончился скроллинг
      this.state.stateGenerateNewMap = false;
      for (const plate of this.state.plates) {
        plate.dy = 0;
      }
      this.state.players.forEach((element) => {
        element.dy -= this.koefScrollSpeed;
      });
      // this.state.players[0].dy -= this.koefScrollSpeed;
    }
  }

  engine() {
    if (this.multiplayer === true) {
      this.mapControllerOnline();
    } else {
      this.mapControllerOfline();
    }
    this.circleDraw();
    this.state.commands.forEach((command) => {
      // if (command.idP !== this.state.myIdP) {
      //   alert("1");
      // }
      const player = this.foundPlayer(command.idP);
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
