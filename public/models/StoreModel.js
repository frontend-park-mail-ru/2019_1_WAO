import User from '../modules/user';

/**
 * Модель Меню
 */
export default class StoreModel {
  /**
   * Конструктор. Подписывает на проверку авторизации
   * @param {EventBus} eventBus
   */
  constructor(eventBus) {
    this.eventBus = eventBus;
    this.eventBus.on('call', () => {
      console.log('menu store render');
      // this.checkAuth();
      this.eventBus.trigger('render', User);
    });
  }
}
