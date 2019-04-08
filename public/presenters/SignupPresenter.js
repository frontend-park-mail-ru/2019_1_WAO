import SignUpView from '../views/SignUpView';
import SignUpModel from '../models/SignupModel';
import Router from '../modules/router';
import { EventBus } from '../modules/eventbus';
import BasePresenter from './BasePresenter';

/**
 * SignUpPresenter presenter
 * @class SignUpPresenter
 */
export default class SignUpPresenter extends BasePresenter {
  /**
   * Конструктор
   * Создает Модель и Представление элемента
   * Подписывается на события
   */
  constructor() {
    const application = document.getElementById('application');
    const eventBus = new EventBus();
    const view = new SignUpView(application, eventBus);
    const model = new SignUpModel(eventBus);

    super(view, model, eventBus);

    eventBus.on('signup_ok', () => {
      console.log('signup_ok');
      Router.route('/');
    });
  }
}
