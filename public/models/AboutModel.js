// import { wsConnect, wsClose } from '../modules/ws'; // просто чтоб потестить
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
    // wsConnect(); // просто чтоб потестить. почему в AboutModel? - первая под руку попалась
  }
}
