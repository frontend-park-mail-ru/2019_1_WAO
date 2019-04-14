import {
  postSignUp, checkStatus, parseJSON,
} from '../modules/api';
import checkXSS from '../modules/safe';
import User from '../modules/user';
import { isCorrectNickname, isCorrectEmail, isCorrectPassword } from '../modules/validation';

/**
 * Модель Регистрации
 */
export default class SignUpModel {
  constructor(eventBus) {
    this.eventBus = eventBus;
    this.eventBus.on('call', () => {
      this.eventBus.trigger('render');
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
      const email = form.elements.email.value;
      const password = form.elements.password.value;
      const passwordRepeat = form.elements.passwordRepeat.value;

      const body = {
        nickname,
        email,
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

      const checkEmail = isCorrectEmail(email);
      if (!checkEmail.status) {
        form.elements.email.classList.add('input-area__input_wrong');
        form.elements.email.value = '';
        form.elements.email.placeholder = checkEmail.err;
      }

      const checkPassword = isCorrectPassword(password, passwordRepeat);
      if (!checkPassword.status) {
        form.elements.password.classList.add('input-area__input_wrong');
        form.elements.password.value = '';
        form.elements.password.placeholder = checkPassword.err;
        form.elements.passwordRepeat.classList.add('input-area__input_wrong');
        form.elements.passwordRepeat.value = '';
        form.elements.passwordRepeat.placeholder = checkPassword.err;
      }

      if (checkNickname.status && checkEmail.status && checkPassword.status) {
        this.makeSignUp(body);
      } else {
        this.processForm();
      }
    });
  }

  /**
   * Делает POST-запрос с данными для регистрации
   */
  async makeSignUp(body = {}) {
    try {
      const res = await postSignUp(body);
      const status = await checkStatus(res);
      const data = await parseJSON(status);
      User.set(data);
      User.isAuth = true;
      console.log(User);
      console.log('signup ok');
      this.eventBus.trigger('signup_ok');
    } catch (err) {
      const form = document.querySelector('form');
      form.elements.nickname.value = '';
      form.elements.email.value = '';
      form.elements.password.value = '';
      form.elements.passwordRepeat.value = '';
      form.elements.nickname.placeholder = 'НЕВЕРНО';
      form.elements.email.placeholder = 'НЕВЕРНО';
      form.elements.password.placeholder = 'НЕВЕРНО';
      form.elements.passwordRepeat.placeholder = 'НЕВЕРНО';
      this.processForm();
    }
  }
}
