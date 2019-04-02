import ScoreBoardView from '../views/ScoreBoardView';
import ScoreBoardModel from '../models/ScoreBoardModel';
import { EventBus } from '../modules/eventbus';

/**
 * ScoreBoardPresenter view
 * @class ScoreBoardPresenter
 */
export default class ScoreBoardPresenter {
  /**
   * Конструктор
   * Создает Модель и Представление элемента
   * Подписывается на события
   */
  constructor() {
    const application = document.getElementById('application');
    const eventBus = new EventBus();
    this.view = new ScoreBoardView(application, eventBus);
    this.model = new ScoreBoardModel(eventBus);

    eventBus.on('users_rx', (data) => {
      console.log('users_rx');
      console.log(data);
      this.view.render(application, data);
    });
  }
}
