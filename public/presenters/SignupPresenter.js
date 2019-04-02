import SignUpView from '../views/SignUpView';
import SignUpModel from '../models/SignupModel';
import Router from '../modules/router';
import { EventBus } from '../modules/eventbus';

/**
 * SignUpPresenter presenter
 * @class SignUpPresenter
 */
export default class SignUpPresenter {
  /**
   * Конструктор
   * Создает Модель и Представление элемента
   * Подписывается на события
   */
  constructor() {
    const application = document.getElementById('application');
    const eventBus = new EventBus();
    this.view = new SignUpView(application, eventBus);
    this.model = new SignUpModel(eventBus);

    eventBus.on('signup_ok', () => {
      console.log('signup_ok');
      Router.route('/');
    });

    eventBus.on('signup_bad', () => {
      console.log('signup_bad');
      Router.route('/signup');
    });
  }
}
