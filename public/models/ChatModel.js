import { GlobalBus } from '../modules/eventbus';
import User from '../modules/user';
import Chat from '../modules/chat';

/**
 * Модель Меню
 */
export default class ChatModel {
  /**
   * Конструктор. Подписывает на проверку авторизации
   * @param {EventBus} eventBus
   */
  constructor(eventBus, localBus) {
    this.eventBus = eventBus;
    this.localBus = localBus;

    this.eventBus.on('view_show', () => {
      ChatModel.waitAction();
    });
  }

  /**
   * Отклик на клики пользователя
   */
  static waitAction() {
    const form = document.querySelector('form');
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const [el] = document.getElementsByClassName('message-input__input');
      const message = el.value;
      // const message = form.elements.message.value;
      Chat.send(message);
    });
  }
}
