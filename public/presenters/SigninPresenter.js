import SignInView from '../views/signin/SignInView';
import SignInModel from '../models/SigninModel';
import EventBus from '../modules/eventbus';

/**
 * SignInView view
 * @class SignInView
 */
export default class SignInPresenter {
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
    this.view = new SignInView(application, eventBus);
    this.model = new SignInModel(eventBus);

    globalEventBus.on('auth_bad', () => {
      Router.route('/signin');
    });

    eventBus.on('auth_ok', () => {
      Router.route('/');
    });

    eventBus.on('signin_ok', () => {
      Router.route('/');
    });

    eventBus.on('signin_bad', () => {
      Router.route('/signin');
    });
  }
}
