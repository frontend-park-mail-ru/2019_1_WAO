import User from '../modules/user';

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
      this.eventBus.trigger('render', User);
    });
  }
}
