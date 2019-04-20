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
  constructor(elements) {
    const [appEl] = elements;
    const eventBus = new EventBus();
    const view = new SignUpView(appEl, eventBus);
    const model = new SignUpModel(eventBus);

    super(view, model, eventBus);

    eventBus.on('signup_ok', () => {
      console.log('signup_ok');
      Router.route('/');
    });
  }
}
