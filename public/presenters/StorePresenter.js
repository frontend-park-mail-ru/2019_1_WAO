import StoreView from '../views/StoreView';
import StoreModel from '../models/StoreModel';
import { EventBus } from '../modules/eventbus';
import BasePresenter from './BasePresenter';
import UserbarPresenter from '../presenters/UserbarPresenter';

/**
 * Представитель Меню
 * @class MenuPresenter
 */
export default class StorePresenter extends BasePresenter {
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

    const view = new StoreView(application, eventBus, [userbar.view]);
    const model = new StoreModel(eventBus);
    super(view, model, eventBus);
  }
}
