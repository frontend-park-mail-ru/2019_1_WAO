import {
  getAuth, putProfile, checkStatus, parseJSON,
} from '../modules/api';
import User from '../modules/user';
import checkXSS from '../utils/safe';
import { checkValidationNEP } from '../utils/validation';

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
        this.eventBus.trigger('auth_bad');
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
      // const password = form.elements['password'].value;
      const password1 = 'kostyl'; // секретный ключ, не запоминать
      const password2 = 'kostyl';
      const image = document.getElementById('inputImg').files[0];

      if (!checkValidationNEP(nickname, email, password1, password2)) {
        return;
      }

      if (!checkXSS({ nickname, email, password1 })) {
        return;
      }

      const formData = new FormData();
      formData.append('nickname', nickname);
      formData.append('email', email);
      formData.append('password', password1);
      formData.append('image', image);

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
