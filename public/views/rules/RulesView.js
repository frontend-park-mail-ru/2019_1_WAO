import BaseView from '../view/BaseView';
import template from './Rules.tmpl.xml';
import NavbarTemplate from '../../components/Navbar/Navbar.tmpl.xml';

/**
 * RulesView view
 * @class RulesView
 */
export default class RulesView extends BaseView {
  /**
   * Конструктор класса View
   * @param {document.body} el Куда отображать
   * @param {EventBus} eventBus Локальная шина событий
   */
  constructor(el, eventBus) {
    super(el, eventBus, template);
  }

  render(root, data = {}) {
    this.el = root;
    this.el.innerHTML = NavbarTemplate();
    this.el.innerHTML += this.template(data);
    this.rendered = true;
  }
}
