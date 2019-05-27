/* eslint-disable no-plusplus */
/* eslint-disable max-len */
import { gameSettings } from '../gameConfig';
import { genMap } from './mapLogic';

import { gameConfig } from '../gameConfig';
export default class Fizic {
  constructor(state, canvas, score, settings, multiplayer = false) {
  // передаваемые данные
    this.score = score;
    this.canvas = canvas;
    this.state = state;
    this.settings = settings
    this.multiplayer = multiplayer;
    this.gameSettings = gameSettings;
    // Объявляемые переменные
    this.state.plates = [];
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
    const { stateScrollMap } = this;
    const { koefScrollSpeed } = this.settings.player ;
    function playerFalls(player) {
      return player.dy >= 0;
    }
    function playerFallsWithoutScrollingSpeed(player) {
      return (player.dy - koefScrollSpeed) >= 0;
    }
    function mapDoesntScroll() {
      return stateScrollMap === false;
    }
    function playerNextPositionUnderPlate(player, plate) {
      return (player.y + player.dy * command.delay) < (plate.y - 15);
    }
    function playerNextPositionUnderPlateWithoutScroll(player, plate) {
      return (player.y + (player.dy - koefScrollSpeed) * command.delay) < (plate.y - 15);
    }

    const player = this.state.players[command.idP];
    const plate = this.selectNearestBlock(player);
    if (Object.getOwnPropertyNames(plate).length === 0) {
      return;
    }
    if ((playerFalls(player) && mapDoesntScroll())
      || (playerFallsWithoutScrollingSpeed(player) && !mapDoesntScroll())) {
      if (((playerFalls(player) && mapDoesntScroll()) && (playerNextPositionUnderPlate(player, plate)))
         || ((playerFallsWithoutScrollingSpeed(player) && !mapDoesntScroll()) && playerNextPositionUnderPlateWithoutScroll(player, plate))) {
        return;
      }
      
      // Если был включен счетчик очков, то передать в него пластину от которой будем прыгать
      // if (this.score) {
      //   this.score.giveCurrentPlate(
      //     getKeyByValue(this.state.plates, plate)
      //   );
      // }
      player.y = plate.y - 15;
      this.jump(player);
    }
  }

  // Вспомогательная функция для функции коллизии
  // Ищет ближайший по игру блок под игроком
  selectNearestBlock(player) {
    let nearestBlock = {};
    let minY = this.canvas.height;
    function playerInAreaOfPlate(plate) {
      return (player.x + player.width >= plate.x && player.x <= plate.x + 90);
    }
    function playerAbouteAPlate(plate) {
      return (plate.y - player.y < minY && player.y <= plate.y);
    }
    Object.values(this.state.plates).forEach((plate) => {
      if (playerInAreaOfPlate(plate)) {
        if (playerAbouteAPlate(plate)) {
          minY = plate.y - player.y;
          nearestBlock = plate;
        }
      }
    });
    return nearestBlock;
  }

  // Отрисовка по кругу

  circleDraw() {
    Object.values(this.state.players).forEach((player) => {
      if (player.x > this.canvas.width) {
        player.x = 0;
      } else if (player.x < 0) {
        player.x = this.canvas.width;
      }
    });
  }

  // функции для прыжка

  jump(player) {
    const plate = Object.values(this.state.plates)[0];
    if (plate.dy !== 0) {
      player.dy = this.settings.player.koefJump + plate.dy;
    } else {
      player.dy = this.settings.player.koefJump;
    }
  }

  // функции изменения скорости

  processSpeed(command) {
    const player = this.state.players[command.idP];
    player.dy += (this.settings.player.gravity * command.delay);
  }

  // Сдвиг персонажа вниз

  move(command) {
    const player = this.state.players[command.idP];
    player.y += (player.dy * command.delay);
  }

  // Сдвиг все карты вниз

  scrollMap(delay) {  // Работает только для текущего игрока
    Object.values(this.state.plates).forEach((plate) => { plate.y += plate.dy * delay; });
    // if (this.state.newPlates.length > 0) {
    //   this.state.newPlates.forEach((elem) => {
    //     elem.y += this.state.plates[0].dy * delay;
    //   });
    // }
  }

  // Определение координат самого нижнего игрока
  foundLowerPlayer() {
    let lowestY = -Number.MAX_SAFE_INTEGER;
    Object.values(this.state.players).forEach((player) => {
      if (player.y > lowestY) {
        lowestY = player.y;
      }
    });
    return lowestY;
  }


  // Скроллинг карты
  mapControllerOnline() {
    // Игрок добрался до 3/4 экрана, то все плиты и игрок резко смещаются вниз пока игрок не окажется на 1/4 экрана
    if (this.state.players[this.state.myIdP].y <= this.settings.player.maxScrollHeight && this.stateScrollMap === false) {
      this.stateScrollMap = true; // Сигнал запрещающий выполнять этот код еще раз пока не выполнится else
      // this.socket.send(JSON.stringify({
      //   type: 'map',
      // }));
      // Очистить this.state от старых элементов
      // const lowestY = this.foundLowerPlayer();
      // for (let i = 0; i < this.state.plates.length; i++) {
      //   if (this.state.plates[i].y > this.settings.map.canvasHeight && this.state.plates[i].y < lowestY) {
      //     this.state.plates.splice(i, 1);
      //     i--;
      //   }
      // }
      // Задаем всем объектам скорость вниз
      Object.values(this.state.plates).forEach((plate) => {
        plate.dy = this.settings.player.koefScrollSpeed;
      });
      Object.values(this.state.players).forEach((element) => {
        element.dy += this.settings.player.koefScrollSpeed;
      });
    } else if (this.state.players[this.state.myIdP].y > this.settings.player.minScrollHeight && this.stateScrollMap === true) {
      this.stateScrollMap = false; // Закончился скроллинг
      Object.values(this.state.plates).forEach((plate) => { plate.dy = 0; });
      Object.values(this.state.players).forEach((element) => { element.dy -= this.settings.player.koefScrollSpeed; });
    }
  }

  // Скроллинг карты
  mapControllerOfline() {
    // Игрок добрался до 3/4 экрана, то все плиты и игрок резко смещаются вниз пока игрок не окажется на 1/4 экрана
    if (this.state.players[this.state.myIdP].y <= this.settings.player.maxScrollHeight && this.stateScrollMap === false) {
      this.stateScrollMap = true; // Сигнал запрещающий выполнять этот код еще раз пока не выполнится else
      const platesSliceLenght = Object.values(this.state.plates).length;
      this.state.newPlates = genMap(
        (this.state.plates[platesSliceLenght - 1].y - 20),
        (this.settings.map.koefHeightOfMaxGenerateSlice + this.state.plates[platesSliceLenght - 1].y),
        (this.settings.map.koefGeneratePlates * (this.settings.map.koefHeightOfMaxGenerateSlice + this.state.plates[platesSliceLenght - 1].y)).toFixed(),
        this.state.idPhysicBlockCounter,
      );
      this.state.idPhysicBlockCounter.Phys += 1;
      Object.assign(this.state.plates, this.state.newPlates);
      // Очистить this.state от старых элементов
      Object.values(this.state.plates).filter(plate => { return plate.y <= 700;});

      // Задаем всем объектам скорость вниз
      Object.values(this.state.plates).forEach((plate) => { plate.dy = this.settings.player.koefScrollSpeed; });
      Object.values(this.state.players).forEach((element) => { element.dy += this.settings.player.koefScrollSpeed; });
    } else if (this.state.players[this.state.myIdP].y > this.settings.player.minScrollHeight && this.stateScrollMap === true) {
      this.stateScrollMap = false; // Закончился скроллинг
      Object.values(this.state.plates).forEach((plate) => { plate.dy = 0; });
      Object.values(this.state.players).forEach((element) => { element.dy -= this.settings.player.koefScrollSpeed; });
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
      const player = this.state.players[command.idP];
      if (command.direction === 'LEFT') {
        player.x -= player.dx * command.delay;
      } else if (command.direction === 'RIGHT') {
        player.x += player.dx * command.delay;
      }
      this.processSpeed(command);
      this.collision(command);
      this.move(command);
    });
    if (Object.values(this.state.plates)[0].dy !== 0) {
      this.scrollMap(this.state.commands[0].delay);
    }
    // Отладка
    // if (this.state.otladka === true) {
    //   if (this.state.players[0].dy > 1.5) {
    //     alert(`Player 0 Failed ${ this.state.players[0].y }`);
    //   }
    //   if (this.state.players[1].dy > 1.5) {
    //     alert(`Player 1 Failed ${ this.state.players[1].y }`);
    //   }
    //   this.state.otladka = false;
    // }
    this.state.commands = [];
    return this.state;
  }
}
