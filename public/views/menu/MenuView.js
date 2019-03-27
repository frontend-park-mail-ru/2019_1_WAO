import BaseView from '../view/BaseView.js';
import template from './Menu.tmpl.xml';
// import {NavbarComponent} from '../components/Navbar/Navbar.js';

/**
 * MenuView view
 * @class MenuView
 */
export default class MenuView extends BaseView {
  constructor(el, eventBus) {
  	super(el, eventBus, template);
    // this._eventBus.trigger("auth_check");
  }

  render(root, data = []) {
    this._el.innerHTML = this._template(data);
  }
}
