import RulesView from '../views/RulesView';
import RulesModel from '../models/RulesModel';
import { EventBus } from '../modules/eventbus';
import NavbarPresenter from '../presenters/NavbarPresenter';

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

    const navbar = new NavbarPresenter(eventBus);
    this.view = new RulesView(application, eventBus, [navbar.view]);
    this.model = new RulesModel(eventBus);
  }
}
