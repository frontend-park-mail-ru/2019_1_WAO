import BaseView from './BaseView';
import template from '../components/navbar/Navbar.tmpl.xml';

/**
 * NavBar view
 * @class NavBar
 */
export default class NavbarView extends BaseView {
  /**
   * Конструктор класса View
   * @param {document.body} el Куда отображать
   * @param {EventBus} eventBus Локальная шина событий
   */
  constructor(el, eventBus) {
    super(el, eventBus, template);
  }
}
