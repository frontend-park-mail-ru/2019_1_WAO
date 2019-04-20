import SignInView from '../views/SignInView';
import SignInModel from '../models/SigninModel';
import Router from '../modules/router';
import { EventBus } from '../modules/eventbus';
import BasePresenter from './BasePresenter';

/**
 * SignInView view
 * @class SignInView
 */
export default class SignInPresenter extends BasePresenter {
  /**
   * Конструктор
   * Создает Модель и Представление элемента
   * Подписывается на события
   * @param {Router} Router
   * @param {EventBus} globalEventBus Глобальная шина событий
   */
  constructor(elements) {
    const [appEl] = elements;
    const eventBus = new EventBus();
    const view = new SignInView(appEl, eventBus);
    const model = new SignInModel(eventBus);

    super(view, model, eventBus);

    eventBus.on('auth_ok', () => {
      console.log('auth_ok');
      Router.route('/');
    });

    eventBus.on('signin_ok', () => {
      console.log('signip_ok');
      Router.route('/');
    });
  }
}
