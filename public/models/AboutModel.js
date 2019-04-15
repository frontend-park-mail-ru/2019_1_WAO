import User from '../modules/user';
import { wsConnect, wsClose } from '../modules/ws'; // просто чтоб потестить
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
      this.eventBus.trigger('render', User);
    });
    wsConnect(); // просто чтоб потестить. почему в AboutModel? - первая под руку попалась
  }
}
