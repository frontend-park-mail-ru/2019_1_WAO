import RulesView from '../views/RulesView';
import RulesModel from '../models/RulesModel';
import { EventBus } from '../modules/eventbus';
import BasePresenter from './BasePresenter';


/**
 * RulesPresenterRulesPresenter view
 * @class RulesPresenter
 */
export default class RulesPresenter extends BasePresenter {
  /**
   * Конструктор
   * Создает Модель и Представление элемента
   * Подписывается на события
   */
  constructor() {
    const application = document.getElementById('application');
    const eventBus = new EventBus();

    const view = new RulesView(application, eventBus, []);
    const model = new RulesModel(eventBus);

    super(view, model, eventBus);
  }
}
