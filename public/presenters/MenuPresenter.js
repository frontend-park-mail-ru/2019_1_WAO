import MenuView from '../views/MenuView';
import MenuModel from '../models/MenuModel';
import { EventBus } from '../modules/eventbus';
import NavbarPresenter from '../presenters/NavbarPresenter';

/**
 * Представитель Меню
 * @class MenuPresenter
 */
export default class MenuPresenter {
  /**
   * Конструктор
   * Создает Модель и Представление элемента, а также презентереов включаемых компонентов
   * Подписывается на события
   */
  constructor() {
    const application = document.getElementById('application');
    const eventBus = new EventBus();

    // это навбар, он рендерится внутри Меню,
    // а что бы он мог реагировать на события,
    // в него пробрасывается шина событий Меню
    const navbar = new NavbarPresenter(eventBus);

    this.view = new MenuView(application, eventBus, [navbar.view]);
    this.model = new MenuModel(eventBus);
  }
}
