import BaseView from '../view/BaseView.js'
import template from './signin.tmpl.xml';

/**
 * MenuView view
 * @class MenuView
 */
export default class SignInView extends BaseView {
  constructor(el, eventBus) {
    super(el, eventBus, template);
    //this._eventBus.trigger("auth_check");
  }
}