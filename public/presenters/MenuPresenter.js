import MenuView from '../views/MenuView';
import MenuModel from '../models/MenuModel';
import { EventBus } from '../modules/eventbus';
import BasePresenter from './BasePresenter';
import UserbarPresenter from './UserbarPresenter';

/**
 * Представитель Меню
 * @class MenuPresenter
 */
export default class MenuPresenter extends BasePresenter {
  /**
   * Конструктор
   * Создает Модель и Представление элемента, а также презентереов включаемых компонентов
   * Подписывается на события
   */
  constructor() {
    const application = document.getElementById('application');
    const eventBus = new EventBus();

    // это карточка пользователя, он рендерится внутри Меню,
    // а что бы он мог реагировать на события,
    // в него пробрасывается шина событий Меню
    const userbar = new UserbarPresenter(eventBus);

    const view = new MenuView(application, eventBus, [userbar.view]);
    const model = new MenuModel(eventBus);
    super(view, model, eventBus);
  }
}
