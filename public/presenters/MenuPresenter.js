import MenuView from '../views/menu/MenuView';
import MenuModel from '../models/MenuModel';
import EventBus from '../modules/eventbus';

/**
 * Представитель Меню
 * @class MenuPresenter
 */
export default class MenuPresenter {
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
    this.view = new MenuView(application, eventBus);
    this.model = new MenuModel(eventBus);

    globalEventBus.on('auth_bad', () => {
      Router.route('/signin');
    });

    eventBus.on('auth_bad', () => {
      Router.route('/signin');
    });
  }
}
