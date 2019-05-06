/* eslint-disable func-names */
/* eslint-disable quotes */
import User from "./user";
import { host } from "./api";
import { GlobalBus } from './eventbus';

const chatAdr = '192.168.43.245:8080';

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
    this.ws = new WebSocket(`ws://${chatAdr}/socket`);
    console.log('WS START');
    this.connected = true;

    this.ws.onerror = function (error) {
      this.connected = false;
      alert(`Ошибка ${error.message}`);
    };
    this.ws.onmessage = (event) => {
      GlobalBus.trigger('chat_rx', event.data);
      console.log(event.data);
      // GlobalBus.trigger('chat_rx', { msg: event.data });
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
        author_name: User.nickname,
        text,
      }),
    );
  }
}

export default new Chat();
