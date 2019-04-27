/* eslint-disable quotes */
import User from './user';
import { host } from './api';

class Chat {
  constructor() {
    this.host = host;
    this.ws.onopen = function () {
      alert('Соединение установлено.');
    };
    this.ws.onclose = function (event) {
      if (event.wasClean) {
        alert('Соединение закрыто чисто');
      } else {
        alert('Обрыв соединения'); // например, "убит" процесс сервера
      }
    };
    this.ws.onmessage = function (event) {
      const message = JSON.parse(event.data);
      const massageDiv = document.createElement('div');
      massageDiv.innerHTML = `Author: <h4>${message.author}</h4><br>${message.text}<br>`;

      document.getElementById('messages').appendChild(massageDiv);
    };

    this.ws.onerror = function (error) {
      alert(`Ошибка ${error.message}`);
    };

    document.addEventListener('DOMContentLoaded', () => {
      alert('SEND Load!!!');
    });
    const ButtnSend = document.getElementById('send');
    ButtnSend.addEventListener('click', () => {
      this.ws.send(JSON.stringify({
        author: 'auth',
        text: document.getElementById('msg').value,
      }));
    });
  }

  start() {
    this.ws = new WebSocket(`ws://${this.host}/socket`);
  }

  stop() {
    this.ws.send(
      'Disconnect',
    );
  }

  send(text) {
    this.ws.send(JSON.stringify({
      author: User.nickname,
      text,
    }));
  }
  // var ws = new WebSocket("ws://127.0.0.1:8080/socket");
  //   ws.onopen = function() {
  //   alert("Соединение установлено.");
  // };

  // ws.onclose = function(event) {
  //   if (event.wasClean) {
  //     alert('Соединение закрыто чисто');
  //   } else {
  //     alert('Обрыв соединения'); // например, "убит" процесс сервера
  //   }
  // };

  // ws.onmessage = function(event) {
  //     const message = JSON.parse(event.data);
  //     const massageDiv = document.createElement('div');
  //     massageDiv.innerHTML = 'Author: <h4>' + message.author + '</h4><br>' + message.text + '<br>';

  //     document.getElementById('messages').appendChild(massageDiv);
  // };

  // ws.onerror = function(error) {
  //   alert("Ошибка " + error.message);
  // };

  // document.addEventListener('DOMContentLoaded', function() {
  //   alert("SEND Load!!!");

  // });

  // const ButtnSend = document.getElementById('send');
  // ButtnSend.addEventListener('click', function() {
  //   ws.send(JSON.stringify({
  //       author: "auth",
  //       text: document.getElementById('msg').value,
  //   }));
  // });
}
