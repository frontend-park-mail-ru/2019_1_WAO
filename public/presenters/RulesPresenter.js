import RulesView from '../views/rules/RulesView';
import RulesModel from '../models/RulesModel';
import EventBus from '../modules/eventbus';

/**
 * RulesPresenterRulesPresenter view
 * @class RulesPresenter
 */
export default class RulesPresenter {
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
    this.view = new RulesView(application, eventBus);
    this.model = new RulesModel(eventBus);

    globalEventBus.on('auth_bad', () => {
      Router.route('/signin');
    });
  }
}
