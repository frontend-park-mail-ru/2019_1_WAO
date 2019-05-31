import {
  putProfile, checkStatus, parseJSON,
} from '../modules/api';
import User from '../modules/user';
import checkXSS from '../modules/safe';
import { isCorrectNickname, isCorrectEmail, isCorrectPassword } from '../modules/validation';

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
    this.eventBus.on('ready', (data) => {
      console.log(data);
      this.eventBus.trigger('render', data);
      this.eventBus.trigger('show', data);
    });

    this.eventBus.on('view_show', () => {
      this.processForm();
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
      const [imageInput] = document.getElementsByClassName('profile-form__image-input');
      const [image] = imageInput.files;

      if (!checkXSS({
        nickname,
        email,
        password,
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


      let checkPassword = {};
      if (password) {
        checkPassword = isCorrectPassword(password, password);
        if (!checkPassword.status) {
          form.elements.password.classList.add('input-area__input_wrong');
          form.elements.password.value = '';
          form.elements.password.placeholder = checkPassword.err;
        }
      }

      if (checkNickname.status && checkEmail.status && (!password || checkPassword.status)) {
        const formData = new FormData();
        formData.append('nickname', nickname);
        formData.append('email', email);
        if (password) {
          formData.append('password', password);
        }
        if (image) {
          formData.append('image', image);
        }
        this.makeUpdate(User.nickname, formData);
      } else {
        this.processForm();
      }
    });
  }

  /**
   * Делает POST-запрос с параметрами: ник, почта, пароль, картинка
   */
  async makeUpdate(nickname, formData) {
    try {
      const res = await putProfile(nickname, formData);
      const status = await checkStatus(res);
      const data = await parseJSON(status);
      User.set(data);
      User.isAuth = true;
      console.log(User);
      console.log('update ok');
      this.eventBus.trigger('render', data);
      this.eventBus.trigger('show', data);
    } catch (err) {
      const form = document.querySelector('form');
      form.elements.email.value = User.email;
      form.elements.password.value = '';
      form.elements.password.placeholder = 'НЕВЕРНО';
      this.processForm();
    }
  }
}
