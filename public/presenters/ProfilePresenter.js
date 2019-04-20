import ProfileView from '../views/ProfileView';
import ProfileModel from '../models/ProfileModel';
import { EventBus, GlobalBus } from '../modules/eventbus';
import BasePresenter from './BasePresenter';
import UserbarPresenter from './UserbarPresenter';
import User from '../modules/user';

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
  constructor(elements) {
    const [appEl, userEl] = elements;
    const eventBus = new EventBus();

    const userbar = new UserbarPresenter(eventBus, userEl);

    const view = new ProfileView(appEl, eventBus, [userbar.view]);
    const model = new ProfileModel(eventBus);

    super(view, model, eventBus);

    this.eventBus.on('call', () => {
      if (User.isAuth) {
        this.eventBus.trigger('data_req');
      } else {
        GlobalBus.trigger('auth_bad');
      }
    });
  }
}
