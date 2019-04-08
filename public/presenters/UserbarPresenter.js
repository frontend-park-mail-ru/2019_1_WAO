import UserbarView from '../views/UserbarView';
import UserbarModel from '../models/UserbarModel';
import BasePresenter from './BasePresenter';
// import { EventBus } from '../modules/eventbus';

/**
 * Представитель Меню
 * @class UserbarPresenter
 */
export default class UserbarPresenter extends BasePresenter {
  /**
   * Конструктор
   * Создает Модель и Представление элемента
   * Подписывается на события
   */
  constructor(eventBus) {
    const application = document.getElementById('application');
    // const eventBus = new EventBus();
    const view = new UserbarView(application, eventBus);
    const model = new UserbarModel(eventBus);

    super(view, model, eventBus);

    eventBus.on('users_rx', (data) => {
      console.log('userbar - users_rx');
      this.view.render(application, data);
    });
  }
}
