// import {
//   getAuth, checkStatus, parseJSON, getUser,
// } from '../modules/api';
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
  constructor(eventBus, localBus) {
    this.eventBus = eventBus;
    this.localBus = localBus;
    this.eventBus.on('data_req', () => {
      console.log('data_req via Userbar Model');
      this.ckeckUser();
    });

    this.eventBus.on('view_show', () => {
      UserbarModel.waitAction();
    });
  }

  /**
   * Установка данных пользователя
   */
  async ckeckUser() {
    await User.load();
    console.log('ready');
    this.localBus.trigger('show', User);
    this.eventBus.trigger('ready', User);
  }

  /**
   * Отклик на клики пользователя
   */
  static waitAction() {
    const buttons = document.getElementsByClassName('app-actions__out');
    if (buttons.length === 0) {
      return;
    }
    const [buttonOut] = buttons;
    buttonOut.addEventListener('click', (event) => {
      event.preventDefault();
      console.log('PRESS OUT');
      User.isAuth = false;
      GlobalBus.trigger('auth_out');
    });
  }
}
