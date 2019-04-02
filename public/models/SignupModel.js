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
      this.makeSignUp();
    });
  }

  /**
   * Делает POST-запрос с данными для регистрации
   */
  makeSignUp() {
    const form = document.querySelector('form');
    const [footer] = document.getElementsByClassName('registration_input_footer_divblock_registration');
    footer.addEventListener('click', (event) => {
      event.preventDefault();
      const nickname = form.elements.nickname.value;
      const email = form.elements.email.value;
      const password1 = form.elements.password.value;
      const password2 = form.elements.password_repeat.value;

      const body = {
        nickname,
        email,
        password: password1,
      };

      if (!checkValidationNEP(nickname, email, password1, password2)) {
        return;
      }

      if (!checkXSS(body)) {
        return;
      }

      postSignUp(body)
        .then(checkStatus)
        .then(() => {
          console.log('signup auth ok');
          this.eventBus.trigger('signup_ok');
        })
        .catch(() => {
          console.log('signup auth bad');
          this.eventBus.trigger('signup_bad');
        });
    });
  }
}
