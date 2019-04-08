import { getAuth, checkStatus, parseJSON } from '../modules/api';
import { GlobalBus } from '../modules/eventbus';

/**
 * Модель Меню
 */
export default class MenuModel {
  /**
   * Конструктор. Подписывает на проверку авторизации
   * @param {EventBus} eventBus
   */
  constructor(eventBus) {
    this.eventBus = eventBus;
    this.eventBus.on('call', () => {
      console.log('menu start render');
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
      })
      .catch((err) => {
        console.log(err);
        console.log('menu auth bad');
        GlobalBus.trigger('auth_bad');
      });
  }
}
