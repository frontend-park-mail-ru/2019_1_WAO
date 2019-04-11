import {
  getAuth, putProfile, checkStatus, parseJSON,
} from '../modules/api';
import User from '../modules/user';
import checkXSS from '../utils/safe';
import { isCorrectNickname, isCorrectEmail, isCorrectPassword } from '../modules/validation';
import { GlobalBus } from '../modules/eventbus';

/**
 * Модель Профиля пользователя
 * Умеет проверять авторизацию, и обновлять данные о пользователе
 */
export default class ProfileModel {
  /**
   * Конструктор. Подписывает на проверку авторизации
   * @param {EventBus} eventBus
   */
  constructor(eventBus) {
    this.eventBus = eventBus;
    this.eventBus.on('call', () => {
      this.eventBus.trigger('render');
      this.checkAuth();
    });
  }

  /**
   * Проверка авторизации
   */
  checkAuth() {
    getAuth()
      .then(checkStatus)
      .then(parseJSON)
      .then((data) => {
        console.log('profile auth ok');
        console.log(data);
        User.set(data);
        this.eventBus.trigger('users_rx', {data: data, err: {}});
        this.processForm();
      })
      .catch((err) => {
        console.log('profile auth bad');
        console.log(err);
        GlobalBus.trigger('auth_bad');
      });
  }

  /**
   * Обновление информации о пользователе
   * Читает данные формы и валидирует их
   */
  processForm() {
    const form = document.querySelector('form');
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const nickname = form.elements.nickname.value;
      const email = form.elements.email.value;
      const password = form.elements.password.value;
      const passwordRepeat = password; // упростим жизнь пользователю
      const [imageInput] = document.getElementsByClassName('profile-form__image-input');
      const [image] = imageInput.files;

      if (!checkXSS({
        nickname,
        email,
        password,
        passwordRepeat,
      })) {
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
        const formData = new FormData();
        formData.append('nickname', nickname);
        formData.append('email', email);
        if (password) {
          formData.append('password', password);
        }
        if (image) {
          formData.append('image', image);
        }
        this.makeUpdate(nickname, formData);
      } else {
        this.processForm();
      }
    });
  }

  /**
   * Делает POST-запрос с параметрами: ник, почта, пароль, картинка
   */
  makeUpdate(nickname, formData) {
    putProfile(nickname, formData)
      .then(checkStatus)
      .then(parseJSON)
      .then((data) => {
        User.set(data);
        console.log(data);
        console.log('update ok');
        this.eventBus.trigger('update_ok', {data: data, err: {}});
      })
      .catch(() => {
        console.log('update bad');
        // this.eventBus.trigger('update_bad', User, ['Невалидные данные']);
        // this.eventBus.trigger('update_bad', {data: User, err: ['Невалидные данные']});
        // выглядит как костыль, но возможно это норм решение
        const form = document.querySelector('form');
        form.elements.nickname.value = '';
        form.elements.email.value = '';
        form.elements.password.value = '';
        form.elements.nickname.placeholder = 'НЕВЕРНО';
        form.elements.email.placeholder = 'НЕВЕРНО';
        form.elements.password.placeholder = 'НЕВЕРНО';
      });

  }
}
