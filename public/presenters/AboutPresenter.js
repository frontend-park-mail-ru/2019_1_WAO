import AboutView from '../views/AboutView';
import AboutModel from '../models/AboutModel';
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
    const userbar = new UserbarPresenter(eventBus, userEl);

    const view = new AboutView(appEl, eventBus, [userbar.view]);
    const model = new AboutModel(eventBus);
    super(view, model, eventBus);

    this.eventBus.on('call', () => {
      this.eventBus.trigger('data_req');
    });

    this.eventBus.on('ready', (data) => {
      this.eventBus.trigger('show', data);
    });
  }
}
