import template from '../components/presentation/presentation.hbs';

/**
 * GameView view
 * @class GameView
 */
export default class PresentationView {
  /**
   * Конструктор класса View
   * @param {document.body} el Куда отображать
   * @param {EventBus} eventBus Локальная шина событий
   */
  constructor(el) {
    this.el = el;
    this.template = template;
  }

  render() {
    this.el.innerHTML = this.template({});
    this.el.style.display = null;
  }

  hide() {
    this.el.innerHTML = '';
  }
}
