import BaseView from '../view/BaseView.js'
import template from './signup.tmpl.xml';

/**
 * MenuView view
 * @class MenuView
 */
export default class SignUpView extends BaseView {
  constructor(el, eventBus) {
    super(el, eventBus, template);
    //this._eventBus.trigger("auth_check");
  }
}