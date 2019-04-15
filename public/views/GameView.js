import template from '../components/game/game.hbs';
import '../components/game/game.css';

/**
 * GameView view
 * @class GameView
 */
export default class GameView {
  /**
   * Конструктор класса View
   * @param {document.body} el Куда отображать
   * @param {EventBus} eventBus Локальная шина событий
   */
  constructor(el, eventBus) {
    this.el = el;
    this.eventBus = eventBus;
    this.template = template;
  }

  render() {
    this.el.innerHTML = this.template({});
  }
}
