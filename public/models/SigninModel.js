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
    this.eventBus.on('call', () => {      
      this.eventBus.trigger('render');
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
        this.processForm();
      });
  }

  /**
   * Читает данные формы и валидирует их
   */
  processForm() {
    const form = document.querySelector('form');
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const nickname = form.elements.nickname.value;
      const password = form.elements.password.value;
      const body = {
        nickname,
        password,
      };

      if (!checkXSS(body)) {
        alert('Попытка XSS атаки!');
        this.processForm();
      }

      const checkValidation = checkValidationNP(nickname, password);
      if (!checkValidation.status) {
        this.eventBus.trigger('valid_err', checkValidation.err);
        this.processForm();
      } else {
        this.makeSignin(body);
      }
    });
  }

  /**
   * Делает POST-запрос на вход
   */
  makeSignin(body = {}) {
    postSignIn(body)
      .then(checkStatus)
      .then(parseJSON)
      .then((data) => {
        console.log(data);
        this.eventBus.trigger('signin_ok');
      })
      .catch(() => {
        this.eventBus.trigger('signin_bad', ['Неправильный логин или пароль']);
        this.processForm();
      });
  }
}

