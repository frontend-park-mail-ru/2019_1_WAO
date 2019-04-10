import User from '../modules/user';
/**
 * AboutModel
 */
export default class AboutModel {
  /**
   * Конструктор. Подписывает на проверку авторизации
   * @param {EventBus} eventBus
   */
  constructor(eventBus) {
    this.eventBus = eventBus;
    this.eventBus.on('call', () => {
      console.log('menu start render');
      // this.checkAuth();
      this.eventBus.trigger('render', User);
    });
  }
}
