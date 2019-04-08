import ScoreBoardView from '../views/ScoreBoardView';
import ScoreBoardModel from '../models/ScoreBoardModel';
import { EventBus } from '../modules/eventbus';
import BasePresenter from './BasePresenter';

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
    
    
    const view = new ScoreBoardView(application, eventBus, []);
    const model = new ScoreBoardModel(eventBus);

    super(view, model, eventBus);

    eventBus.on('users_rx', (data) => {
      console.log('users_rx');
      console.log(data);
      this.view.render(application, data);
    });

    eventBus.on('url_change', (data) => {
      console.log(`/users/${data.toString()}`);
      Router.changeUrl(`/users/${data.toString()}`);
    });
  }
}
