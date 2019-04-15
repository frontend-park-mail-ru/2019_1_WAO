// import { baseUrl } from './api';
const { host } = window.location;
// const ws = new WebSocket(`ws://${host}/ws`);
// const ws = new WebSocket('ws://127.0.0.1:3000/ws'); // не хардкод, а детерминированность

// eslint-disable-next-line no-unused-vars
export function wsConnect(callback, ...params) {
  ws.onopen = () => {
    console.log('ws success connect');
  };

  ws.onmessage = (event) => {
    console.log(event);
    // callback(...params);
  };
}

export function wsSend(message = '') {
  ws.send(message);
}

export function wsClose() {
  ws.close();
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
