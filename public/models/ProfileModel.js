import {
  getAuth, putProfile, checkStatus, parseJSON,
} from '../modules/api';
import User from '../modules/user';
import checkXSS from '../utils/safe';
import { checkValidationNEP } from '../utils/validation';
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
    this.eventBus.on('view_show', () => {
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
        this.eventBus.trigger('users_rx', data);
        this.updateUser();
      })
      .catch(() => {
        console.log('profile auth bad');
        GlobalBus.trigger('auth_bad');
      });
  }

  /**
   * Обновление информации о пользователе
   * Делает POST-запрос с параметрами: ник, почта, пароль, картинка
   */
  updateUser() {
    const form = document.querySelector('form');
    const [button] = document.getElementsByClassName('profile_change_button');
    button.addEventListener('click', (event) => {
      event.preventDefault();
      const nickname = form.elements.nickname.value;
      const email = form.elements.email.value;
      const password = form.elements.password.value;
      const passwordRepeat = password; // упростим жизнь пользователю
      const [imageInput] = document.getElementsByClassName('profile_input-img');
      const [image] = imageInput.files;

      if (!checkXSS({
        nickname,
        email,
        password,
        passwordRepeat,
      })) {
        alert('Попытка XSS атаки!');
        this.checkAuth();
      }

      const checkValidation = checkValidationNEP(nickname, email, password, passwordRepeat);
      if (!checkValidation.status) {
        console.log(checkValidation.err);
        this.eventBus.trigger('valid_err', checkValidation.err);
        this.checkAuth();
      }

      // const formData = new FormData(form);
      const formData = new FormData();
      formData.append('nickname', nickname);
      formData.append('email', email);
      if (password) {
        formData.append('password', password);
      }
      if (image) {
        formData.append('image', image);
      }

      putProfile(nickname, formData)
        .then(checkStatus)
        .then(parseJSON)
        .then((data) => {
          User.set(data);
          console.log(data);
          console.log('update ok');
          this.eventBus.trigger('update_ok', data);
        })
        .catch(() => {
          console.log('update bad');
          this.eventBus.trigger('update_bad');
        });
    });
  }
}
