import ProfileView from '../views/profile/ProfileView';
import ProfileModel from '../models/ProfileModel';
import EventBus from '../modules/eventbus';

/**
 * ProfilePresenter view
 * @class ProfilePresenter
 */
export default class ProfilePresenter {
  /**
   * Конструктор
   * Создает Модель и Представление элемента
   * Подписывается на события
   * @param {Router} Router 
   * @param {EventBus} globalEventBus Глобальная шина событий
   */
  constructor(Router, globalEventBus) {
    const application = document.getElementById('application');
    const eventBus = new EventBus();
    this.view = new ProfileView(application, eventBus);
    this.model = new ProfileModel(eventBus);

    globalEventBus.on('auth_bad', () => {
      Router.route('/signin');
    });

    eventBus.on('users_rx', (data) => {
      console.log(data);
      this.view.render(application, data);
    });
  }
}
