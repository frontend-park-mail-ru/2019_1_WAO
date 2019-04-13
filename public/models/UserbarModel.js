import { getAuth, checkStatus, parseJSON } from '../modules/api';
import { GlobalBus } from '../modules/eventbus';
import User from '../modules/user';

/**
 * Модель Меню
 */
export default class UserbarModel {
  /**
   * Конструктор. Подписывает на проверку авторизации
   * @param {EventBus} eventBus
   */
  constructor(eventBus) {
    this.eventBus = eventBus;
    this.eventBus.on('call', () => {
      console.log('call');
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
        console.log('menu auth ok');
        console.log(data);
        // this.eventBus.trigger('users_rx', data);
        this.eventBus.trigger('render', data);
        this.waitAction();
      })
      .catch((err) => {
        console.log(err);
        console.log('menu auth bad');
        GlobalBus.trigger('auth_bad');
      });
  }

  /*
  checkAuth() {
    console.log("UserbarModel User.auth: ", User.isAuth);
    if (User.isAuth) {
      console.log("UserbarModel User: ", User);
      this.eventBus.trigger('render', User);
      this.waitAction();
    } else {
      console.log('menu auth bad');
      GlobalBus.trigger('auth_bad');
    }
  }
  */

  /**
   * Отклик на клики пользователя
   */
  waitAction() {
    const [buttonOut] = document.getElementsByClassName('userbar__door');
    buttonOut.addEventListener('click', (event) => {
      event.preventDefault();
      console.log('PRESS OUT');
      User.isAuth = false;
      GlobalBus.trigger('auth_out');
    });
  }
}
