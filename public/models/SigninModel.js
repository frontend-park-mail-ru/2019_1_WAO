import User from '../modules/user';
import {
  getAuth, postSignIn, checkStatus, parseJSON,
} from '../modules/api';
import checkXSS from '../utils/safe';
import { checkValidationNP } from '../utils/validation';

export default class SignInModel {
  constructor(eventBus) {
    this.eventBus = eventBus;
    this.eventBus.on('view_show', () => {
      this.checkAuth();
    });
  }

  checkAuth() {
    getAuth()
      .then(checkStatus)
      .then(parseJSON)
      .then((data) => {
        console.log('signin auth ok');
        console.log(data);
        User.set(data);
      })
      .catch(() => {
        console.log('signin auth bad');
        this.makeSignin();
      });
  }

  makeSignin() {
    const form = document.querySelector('form');
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const nickname = form.elements.nickname.value;
      const password = form.elements.password.value;
      const body = {
        nickname,
        password,
      };

      if (!checkValidationNP(nickname, password)) {
        return;
      }

      if (!checkXSS(body)) {
        return;
      }

      postSignIn(body)
        .then(checkStatus)
        .then(parseJSON)
        .then((data) => {
          console.log('signin auth ok');
          console.log(data);
          User.set(data);
          this.eventBus.trigger('signin_ok');
        })
        .catch(() => {
          console.log('signin auth bad');
          this.eventBus.trigger('signin_bad');
        });
    });
  }
}
