import BaseView from './BaseView';
import template from '../components/chat/chat.hbs';
import '../components/chat/chat.css';

/**
 * ChatView view
 * @class ChatView
 */
export default class ChatView extends BaseView {
  /**
   * Конструктор класса View
   * @param {document.body} el Куда отображать
   * @param {EventBus} eventBus Локальная шина событий
   */
  constructor(el, eventBus, components = []) {
    super({
      el,
      eventBus,
      template,
      components,
      viewData: {},
      // viewEvent: 'chat_show',
    });
  }
}
