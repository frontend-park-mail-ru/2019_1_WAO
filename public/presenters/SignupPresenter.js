import SignUpView from '../views/signup/SignUpView';
import SignUpModel from '../models/SignupModel';
import EventBus from '../modules/eventbus';

/**
 * SignUpPresenter presenter
 * @class SignUpPresenter
 */
export default class SignUpPresenter {
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
    this.view = new SignUpView(application, eventBus);
    this.model = new SignUpModel(eventBus);

    globalEventBus.on('signup_bad', () => {
      Router.route('/signup');
    });

    eventBus.on('signup_ok', () => {
      Router.route('/');
    });

    eventBus.on('signup_bad', () => {
      Router.route('/signup');
    });
  }
}
