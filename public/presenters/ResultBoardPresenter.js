import ResultBoardView from '../views/ResultBoardView';
import { EventBus } from '../modules/eventbus';
import BasePresenter from './BasePresenter';
// import ChatPresenter from './ChatPresenter'; // временно

/**
 * Представитель Меню
 * @class MenuPresenter
 */
export default class ResultBoardPresenter extends BasePresenter {
  /**
   * Конструктор
   * Создает Модель и Представление элемента, а также презентереов включаемых компонентов
   * Подписывается на события
   */
  constructor(elements) {
    const [appEl] = elements;
    const eventBus = new EventBus();

    const view = new ResultBoardView(appEl, eventBus);
    super(view, {}, eventBus);

    this.eventBus.on('call', (data) => {
      // console.log(data);
      this.eventBus.trigger('show', data);
    });
  }
}
