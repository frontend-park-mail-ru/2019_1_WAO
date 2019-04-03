import BaseView from './BaseView';
import NavbarView from './NavbarView';
import template from '../components/menu/Menu.tmpl.xml';

/**
 * MenuView view
 * @class MenuView
 */
export default class MenuView extends BaseView {
  /**
   * Конструктор класса View
   * @param {document.body} el Куда отображать
   * @param {EventBus} eventBus Локальная шина событий
   */
  constructor(el, eventBus, components = []) {
    //super(el, eventBus, template, components);
    super(el, eventBus, template, [new NavbarView(el, eventBus)]);
  }
}
