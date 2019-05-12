import User from '../modules/user';
import {
  postSignIn, checkStatus, parseJSON, getUser,
} from '../modules/api';
import checkXSS from '../modules/safe';
import { isCorrectNickname, isCorrectPassword } from '../modules/validation';

/**
 * Модель Входа в приложение
 */
export default class SignInModel {
  constructor(eventBus) {
    this.eventBus = eventBus;
    this.eventBus.on('call', () => {
      this.checkAuth();
    });
  }

  /**
   * Проверяет авторизацию
   * Если пользователь не авторизован, то просит ввести логин и пароль
   */
  checkAuth() {
    console.log('SignInModel User.AUTH: ', User.isAuth);
    if (User.isAuth) {
      this.eventBus.trigger('auth_ok');
    } else {
      console.log('check auth bad');
      this.eventBus.trigger('show');
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
  async makeSignin(body = {}) {
    try {
      const res = await postSignIn(body);
      const status = await checkStatus(res);
      const res1 = await getUser(body.nickname);
      const status1 = await checkStatus(res1);
      const data = await parseJSON(status1);
      User.set(data);
      User.isAuth = true;
      console.log(User);
      this.eventBus.trigger('signin_ok');
    } catch (err) {
      const form = document.querySelector('form');
      form.elements.nickname.value = '';
      form.elements.password.value = '';
      form.elements.nickname.placeholder = 'НЕВЕРНО';
      form.elements.password.placeholder = 'НЕВЕРНО';
      const [errorArea] = form.getElementsByClassName('error-area');
      errorArea.text = 'НЕВЕРНО';
      this.processForm();
    }
  }
}
