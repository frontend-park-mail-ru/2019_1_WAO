import { postSignUp, checkStatus } from '../modules/api';
import checkXSS from '../utils/safe';
import { checkValidationNEP } from '../utils/validation';

/**
 * Модель Регистрации
 */
export default class SignUpModel {
  constructor(eventBus) {
    this.eventBus = eventBus;
    this.eventBus.on('view_show', () => {
      this.processForm();
    });
  }

  /**
   * Читает данные формы и валидирует их
   */
  processForm() {
    const form = document.querySelector('form');
    const [footer] = document.getElementsByClassName('registration_input_footer_divblock_registration');
    footer.addEventListener('click', (event) => {
      event.preventDefault();
      const nickname = form.elements.nickname.value;
      const email = form.elements.email.value;
      const password = form.elements.password.value;
      const passwordRepeat = form.elements.password_repeat.value;

      const body = {
        nickname,
        email,
        password,
      };

      if (!checkXSS(body)) {
        alert('Попытка XSS атаки!');
        this.processForm();
      }

      const checkValidation = checkValidationNEP(nickname, email, password, passwordRepeat);
      if (!checkValidation.status) {
        this.eventBus.trigger('valid_err', checkValidation.err);
        console.log(checkValidation.err);
        this.processForm();
      } else {
        this.makeSignUp(body);
      }
    });
  }

  /**
   * Делает POST-запрос с данными для регистрации
   */
  makeSignUp(body = {}) {
    postSignUp(body)
      .then(checkStatus)
      .then(() => {
        console.log('signup ok');
        this.eventBus.trigger('signup_ok');
      })
      .catch(() => {
        console.log('signup bad');
        this.eventBus.trigger('signup_bad', ['Невалидные данные']);
        this.processForm();
      });
  }
}
