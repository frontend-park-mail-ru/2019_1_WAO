import MenuView from '../views/MenuView';
import MenuModel from '../models/MenuModel';
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
  constructor() {
    const application = document.getElementById('application');
    const eventBus = new EventBus();
    this.view = new MenuView(application, eventBus);
    this.model = new MenuModel(eventBus);
  }
}
