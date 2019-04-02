import RulesView from '../views/RulesView';
import RulesModel from '../models/RulesModel';
import { EventBus } from '../modules/eventbus';

/**
 * RulesPresenterRulesPresenter view
 * @class RulesPresenter
 */
export default class RulesPresenter {
  /**
   * Конструктор
   * Создает Модель и Представление элемента
   * Подписывается на события
   */
  constructor() {
    const application = document.getElementById('application');
    const eventBus = new EventBus();
    this.view = new RulesView(application, eventBus);
    this.model = new RulesModel(eventBus);
  }
}
