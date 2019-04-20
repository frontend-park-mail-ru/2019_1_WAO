import ScoreBoardView from '../views/ScoreBoardView';
import ScoreBoardModel from '../models/ScoreBoardModel';
import { EventBus } from '../modules/eventbus';
import BasePresenter from './BasePresenter';
import UserbarPresenter from './UserbarPresenter';
// import Router from '../modules/router';

/**
 * ScoreBoardPresenter view
 * @class ScoreBoardPresenter
 */
export default class ScoreBoardPresenter extends BasePresenter {
  /**
   * Конструктор
   * Создает Модель и Представление элемента
   * Подписывается на события
   */
  constructor(elements) {
    const [appEl, userEl] = elements;
    const eventBus = new EventBus();

    const userbar = new UserbarPresenter(eventBus, userEl);

    const view = new ScoreBoardView(appEl, eventBus, [userbar.view]);
    const model = new ScoreBoardModel(eventBus);

    super(view, model, eventBus);

    this.eventBus.on('call', () => {
      this.eventBus.trigger('data_req');
    });
  }
}
