import AboutView from '../views/AboutView';
import { EventBus } from '../modules/eventbus';
import BasePresenter from './BasePresenter';
import UserbarPresenter from './UserbarPresenter';

/**
 * Представитель Меню
 * @class MenuPresenter
 */
export default class AboutPresenter extends BasePresenter {
  /**
   * Конструктор
   * Создает Модель и Представление элемента, а также презентереов включаемых компонентов
   * Подписывается на события
   */
  constructor(elements) {
    const [appEl, userEl] = elements;
    const eventBus = new EventBus();

    // это карточка пользователя, он рендерится внутри Меню,
    // а что бы он мог реагировать на события,
    // в него пробрасывается шина событий Меню
    // eslint-disable-next-line no-unused-vars
    const userbar = new UserbarPresenter(eventBus, userEl);

    const view = new AboutView(appEl, eventBus);
    super(view, {}, eventBus);

    this.eventBus.on('call', () => {
      this.eventBus.trigger('data_req');
    });

    this.eventBus.on('ready', (data) => {
      this.eventBus.trigger('show', data);
    });
  }
}
