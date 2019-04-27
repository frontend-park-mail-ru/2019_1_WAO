import ChatView from '../views/ChatView';
import BasePresenter from './BasePresenter';
import { EventBus } from '../modules/eventbus';

/**
 * Представитель Меню
 * @class UserbarPresenter
 */
export default class ChatPresenter extends BasePresenter {
  /**
   * Конструктор
   * Создает Модель и Представление элемента
   * Подписывается на события
   */
  constructor(eventBus, element) {
    const localBus = new EventBus();
    const view = new ChatView(element, localBus);
    // const model = new ChatModel(eventBus, localBus);

    super(view, {}, eventBus);

    eventBus.on('show', () => {
      localBus.trigger('show');
    });

    eventBus.on('hide', () => {
      localBus.trigger('hide');
    });

    eventBus.on('call', () => {
      localBus.trigger('show');
    });
  }
}
