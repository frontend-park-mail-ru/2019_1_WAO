import ScoreBoardView from '../views/ScoreBoardView';
import ScoreBoardModel from '../models/ScoreBoardModel';
import { EventBus } from '../modules/eventbus';
import NavbarPresenter from '../presenters/NavbarPresenter';

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
    
    const navbar = new NavbarPresenter(eventBus);
    this.view = new ScoreBoardView(application, eventBus, [navbar.view]);
    this.model = new ScoreBoardModel(eventBus);

    eventBus.on('users_rx', (data) => {
      console.log('users_rx');
      console.log(data);
      this.view.render(application, data);
    });
  }
}
