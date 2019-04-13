import ProfileView from '../views/ProfileView';
import ProfileModel from '../models/ProfileModel';
import { EventBus } from '../modules/eventbus';
import BasePresenter from './BasePresenter';
import UserbarPresenter from './UserbarPresenter';

/**
 * ProfilePresenter view
 * @class ProfilePresenter
 */
export default class ProfilePresenter extends BasePresenter {
  /**
   * Конструктор
   * Создает Модель и Представление элемента
   * Подписывается на события
   */
  constructor() {
    const application = document.getElementById('application');
    const eventBus = new EventBus();

    const userbar = new UserbarPresenter(eventBus);

    const view = new ProfileView(application, eventBus, [userbar.view]);
    const model = new ProfileModel(eventBus);

    super(view, model, eventBus);

    eventBus.on('users_rx', (data) => {
      console.log('users_rx');
      console.log(data);
      this.view.render(application, data);
    });

    eventBus.on('update_ok', (data) => {
      console.log('update_ok');
      this.view.render(application, data);
    });
  }
}
