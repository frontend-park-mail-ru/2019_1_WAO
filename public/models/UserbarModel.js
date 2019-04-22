import {
  getAuth, checkStatus, parseJSON, getUser,
} from '../modules/api';
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
      this.detectUser();
    });

    this.eventBus.on('view_show', () => {
      UserbarModel.waitAction();
    });
  }

  /**
   * Установка данных пользователя
   */
  async detectUser() {
    try {
      if (!User.isAuth) {
        await UserbarModel.checkAuth();
      }
    } catch (err) {
      console.log(err);
    }
    console.log('ready');
    this.localBus.trigger('show', User);
    this.eventBus.trigger('ready', User);
  }

  /**
   * Проверка авторизации
   */
  static async checkAuthOld() {
    try {
      const res = await getAuth();
      const status = await checkStatus(res);
      const data = await parseJSON(status);
      User.set(data);
      User.isAuth = true;
      console.log(User);
    } catch (err) {
      console.log(err);
      User.reset();
      console.log('reset');
    }
  }

  /**
   * Проверка авторизации
   */
  static async checkAuth() {
    try {
      const res = await getAuth();
      const status = await checkStatus(res);
      const nickname = await parseJSON(status);
      // const { nickname } = nickname0;
      console.log(`session ok for ${nickname}`);

      const res2 = await getUser(nickname);
      const status2 = await checkStatus(res2);
      const data = await parseJSON(status2);
      console.log('get user ok');

      User.set(data);
      User.isAuth = true;
      console.log(User);
    } catch (err) {
      console.log(err);
      User.reset();
      console.log('reset');
    }
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
