import UserbarView from '../views/UserbarView';
import UserbarModel from '../models/UserbarModel';
import BasePresenter from './BasePresenter';
import { EventBus } from '../modules/eventbus';

/**
 * Представитель Меню
 * @class UserbarPresenter
 */
export default class UserbarPresenter extends BasePresenter {
  /**
   * Конструктор
   * Создает Модель и Представление элемента
   * Подписывается на события
   */
  constructor(eventBus, element) {
    const localBus = new EventBus();
    const view = new UserbarView(element, localBus);
    const model = new UserbarModel(eventBus, localBus);

    super(view, model, eventBus);

    eventBus.on('hide', () => {
      localBus.trigger('hide');
    });
  }
}
