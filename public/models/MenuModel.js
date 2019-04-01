import { getAuth, checkStatus, parseJSON } from '../modules/api';

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
      })
      .catch(() => {
        console.log('menu auth bad');
        this.eventBus.trigger('auth_bad');
      });
  }
}
