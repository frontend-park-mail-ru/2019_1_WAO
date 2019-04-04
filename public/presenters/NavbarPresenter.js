import NavbarView from '../views/NavbarView';
import NavbarModel from '../models/NavbarModel';
import { EventBus } from '../modules/eventbus';

/**
 * Представитель Меню
 * @class MenuPresenter
 */
export default class MenuPresenter {
  /**
   * Конструктор
   * Создает Модель и Представление элемента
   * Подписывается на события
   */
  constructor(eventBus) {
    const application = document.getElementById('application');
    // const eventBus = new EventBus();
    this.view = new NavbarView(application, eventBus);
    this.model = new NavbarModel(eventBus);
  }
}
