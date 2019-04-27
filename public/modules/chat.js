/* eslint-disable func-names */
/* eslint-disable quotes */
import User from "./user";
import { host } from "./api";
import { GlobalBus } from './eventbus';

class Chat {
  constructor() {
    this.host = host;
    this.connected = false;
  }

  start() {
    if (this.connected) {
      return;
    }
    // this.ws = new WebSocket(`ws://${this.host}/socket`);
    this.ws = new WebSocket(`ws://127.0.0.1:8080/socket`);
    console.log('WS START');
    this.connected = true;

    this.ws.onerror = function (error) {
      this.connected = false;
      alert(`Ошибка ${error.message}`);
    };
    this.ws.onmessage = (event) => {
      GlobalBus.trigger('chat_rx', Object.assign(User, event.data));
    };
  }

  stop() {
    console.log('WS STOP');
    this.connected = false;
    this.ws.send("Disconnect");
  }

  send(text) {
    console.log(`WS SEND${text}`);
    this.ws.send(
      JSON.stringify({
        author: User.nickname,
        text,
      }),
    );
  }
}

export default new Chat();
