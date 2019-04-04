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
    this.eventBus.on('view_show', () => {
      MenuModel.checkAuth();
    });
  }

  /**
   * Проверка авторизации
   */
  static checkAuth() {
    getAuth()
      .then(checkStatus)
      .then(parseJSON)
      .then((data) => {
        console.log('menu auth ok');
        console.log(data);
      })
      .catch(() => {
        console.log('menu auth bad');
        GlobalBus.trigger('auth_bad');
      });
  }
}
