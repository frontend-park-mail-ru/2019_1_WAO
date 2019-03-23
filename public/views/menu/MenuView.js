import {BaseView} from '../view/BaseView.js'
import template from './Menu.tmpl.xml';

/**
 * MenuView view
 * @class MenuView
 */
export default class MenuView extends BaseView {
  constructor(el, eventBus) {
  	super(el, eventBus);
    this._eventBus.trigger("auth_check");
  }
}
