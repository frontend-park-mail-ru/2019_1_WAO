import GameCore from './index';
import { gameBus } from '../../eventbus';
// import Ws from '../../ws'; // ws переписан. смотри /modules/ws.js

// const ws = new Ws();

export default class OnlineGame extends GameCore {
  constructor(controller, scene) {
    super(controller, scene);

    // this.gameloop = this.gameloop.bind(this);
    // this.gameloopRequestId = null;

    this.socket = new WebSocket('ws://waoteam.tk');
    this.socket.onopen = function (event) {
      alert('Соединение установлено.');
    };

    this.socket.onclose = function (event) {
      if (event.wasClean) {
        alert('Соединение закрыто чисто');
      } else {
        alert('Обрыв соединения'); // например, "убит" процесс сервера
      }
      alert(`Код: ${event.code} причина: ${event.reason}`);
    };

    this.socket.onmessage = function (event) {
      alert(`Получены данные ${event.data}`);
    };

    this.socket.onerror = function (error) {
      alert(`Ошибка ${error.message}`);
    };
  }

  start() {
    super.start();
  }

  onControllsPressed(evt) {
    if (this.pressed('LEFT', evt)) {
      // ws.send('game-command', 'LEFT');
    } else if (this.pressed('RIGHT', evt)) {
      // ws.send('game-command', 'RIGHT');
    } else if (this.pressed('FIRE', evt)) {
      // ws.send('game-command', 'FIRE');
    }
  }

  onGameStarted(evt) {
    this.controller.start();
    this.scene.init(evt);
    this.scene.start();
  }

  onPressedLeftControl(evt) {
    if (this.pressed('LEFT', evt)) {
      this.socket.send('Left'); // Отправка данных на сервер.
    }
  }

  onPressedRightControl(evt) {
    if (this.pressed('RIGHT', evt)) {
      this.socket.send('Right'); // Отправка данных на сервер.
    }
  }

  // eslint-disable-next-line class-methods-use-this
  onGameFinished() {
    this.socket.close();
    gameBus.trigger('game_close');
  }

  onGameStateChanged(evt) {
    this.scene.setState(evt);
  }
}
