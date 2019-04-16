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
  constructor() {
    const application = document.getElementById('application');
    const eventBus = new EventBus();

    const userbar = new UserbarPresenter(eventBus);

    const view = new ScoreBoardView(application, eventBus, [userbar.view]);
    const model = new ScoreBoardModel(eventBus);

    super(view, model, eventBus);

    this.eventBus.on('call', () => {
      this.eventBus.trigger('data_req');
    });
  }
}
