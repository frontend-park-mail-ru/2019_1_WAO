import SignInView from '../views/SignInView';
import SignInModel from '../models/SigninModel';
import Router from '../modules/router';
import { EventBus } from '../modules/eventbus';

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
  constructor() {
    const application = document.getElementById('application');
    const eventBus = new EventBus();
    this.view = new SignInView(application, eventBus);
    this.model = new SignInModel(eventBus);

    eventBus.on('auth_ok', () => {
      console.log('auth_ok');
      Router.route('/');
    });

    eventBus.on('signin_ok', () => {
      console.log('signup_ok');
      Router.route('/');
    });

    eventBus.on('signin_bad', () => {
      console.log('signup_bad');
      Router.route('/signin');
    });
  }
}
