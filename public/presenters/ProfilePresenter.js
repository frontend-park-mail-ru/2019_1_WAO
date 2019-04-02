import ProfileView from '../views/ProfileView';
import ProfileModel from '../models/ProfileModel';
import { EventBus } from '../modules/eventbus';

/**
 * ProfilePresenter view
 * @class ProfilePresenter
 */
export default class ProfilePresenter {
  /**
   * Конструктор
   * Создает Модель и Представление элемента
   * Подписывается на события
   */
  constructor() {
    const application = document.getElementById('application');
    const eventBus = new EventBus();
    this.view = new ProfileView(application, eventBus);
    this.model = new ProfileModel(eventBus);

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
