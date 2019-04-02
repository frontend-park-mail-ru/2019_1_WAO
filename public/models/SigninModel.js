import User from '../modules/user';
import {
  getAuth, postSignIn, checkStatus, parseJSON,
} from '../modules/api';
import checkXSS from '../utils/safe';
import { checkValidationNP } from '../utils/validation';

/**
 * Модель Входа в приложение
 */
export default class SignInModel {
  constructor(eventBus) {
    this.eventBus = eventBus;
    this.eventBus.on('view_show', () => {
      this.checkAuth();
    });
  }

  /**
   * Проверяет авторизацию
   * Если пользователь не авторизован, то просит ввести логин и пароль
   */
  checkAuth() {
    getAuth()
      .then(checkStatus)
      .then(parseJSON)
      .then((data) => {
        console.log('check auth ok');
        console.log(data);
        User.set(data);
        console.log(User);
      })
      .catch(() => {
        console.log('check auth bad');
        this.makeSignin();
      });
  }

  /**
   * Делает POST-запрос с логином и паролем
   */
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
          console.log(data);
          this.eventBus.trigger('signin_ok');
        })
        .catch(() => {
          this.eventBus.trigger('signin_bad');
        });
    });
  }
}
