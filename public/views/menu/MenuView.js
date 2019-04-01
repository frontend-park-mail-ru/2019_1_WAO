import BaseView from '../view/BaseView';
import template from './Menu.tmpl.xml';
// import {NavbarComponent} from '../components/Navbar/Navbar.js';

/**
 * MenuView view
 * @class MenuView
 */
export default class MenuView extends BaseView {
  constructor(el, eventBus) {
    super(el, eventBus, template);
  }

  /*
  render(root, data = []) {
    this.el.innerHTML = this.template(data);
  }
  */
}
