import { host } from './api';

export default class WS {
  constructor() {
    this.host = host;
  }

  // eslint-disable-next-line no-unused-vars
  connect(callback, ...params) {
    this.ws = new WebSocket(`ws://${this.host}/ws`);
    this.ws.onmessage = (event) => {
      console.log(event);
      // callback(...params);
    };
  }

  sent(message = '') {
    this.ws.send(message);
  }

  close() {
    this.ws.close();
  }
}

/*
handleMessage(event) {
  const messageText = event.data;

  try {
    const message = JSON.parse(messageText);
    bus.emit(message.type, message.payload);
  } catch (err) {
    console.error('smth went wront in handleMessage: ', err);
  }
}
*/
