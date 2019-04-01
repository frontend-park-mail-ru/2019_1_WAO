import BaseView from '../view/BaseView';
import template from './profile.tmpl.xml';
import NavbarTemplate from '../../components/Navbar/Navbar.tmpl.xml';

/**
 * ProfileView view
 * @class ProfileView
 */
export default class ProfileView extends BaseView {
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
