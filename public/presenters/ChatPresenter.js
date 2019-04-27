import ChatView from '../views/ChatView';
import ChatModel from '../models/ChatModel';
import BasePresenter from './BasePresenter';
import { EventBus, GlobalBus } from '../modules/eventbus';
import Chat from '../modules/chat';

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
    const model = new ChatModel(eventBus, localBus);

    super(view, model, eventBus);

    eventBus.on('show', () => {
      console.log('Chat show ws');
      Chat.start();
      localBus.trigger('show');
    });

    eventBus.on('hide', () => {
      console.log('Chat close ws');
      Chat.stop();
      localBus.trigger('hide');
    });

    eventBus.on('call', () => {
      console.log('Chat call ws');
      Chat.start();
      localBus.trigger('show');
    });

    GlobalBus.on('chat_rx', (data) => {
      localBus.trigger('show', data);
    });
  }
}
