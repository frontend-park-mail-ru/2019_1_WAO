import User from '../modules/user';
import {
  getAuth, postSignIn, checkStatus, parseJSON,
} from '../modules/api';
import checkXSS from '../utils/safe';
import { isCorrectNickname, isCorrectPassword } from '../modules/validation';

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
    console.log("SignInModel User.AUTH: ", User.isAuth);
    if (User.isAuth) {
      this.eventBus.trigger('auth ok');
    } else {
      console.log('check auth bad');
      this.processForm();
    }
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

      const checkNickname = isCorrectNickname(nickname);
      if (!checkNickname.status) {
        form.elements.nickname.classList.add('input-area__input_wrong');
        form.elements.nickname.value = '';
        form.elements.nickname.placeholder = checkNickname.err;
      }
      
      const checkPassword = isCorrectPassword(password, password);
      if (!checkPassword.status) {
        form.elements.password.classList.add('input-area__input_wrong');
        form.elements.password.value = '';
        form.elements.password.placeholder = checkPassword.err;
      }

      if (checkNickname.status && checkPassword.status) {
        this.makeSignin(body);
      } else {
        this.processForm();
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
        User.set(data);
        User.isAuth = true;
        console.log(User);
        this.eventBus.trigger('signin_ok');
      })
      .catch(() => {
        // this.eventBus.trigger('signin_bad', ['Неправильный логин или пароль']);
        // выглядит как костыль, но возможно это норм решение
        const form = document.querySelector('form');
        form.elements.nickname.value = '';
        form.elements.password.value = '';
        form.elements.nickname.placeholder = 'НЕВЕРНО';
        form.elements.password.placeholder = 'НЕВЕРНО';
        this.processForm();
      });
  }
}

