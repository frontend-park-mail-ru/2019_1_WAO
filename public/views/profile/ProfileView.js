import BaseView from '../view/BaseView.js'
import template from './profile.tmpl.xml';

/**
 * ProfileView view
 * @class ProfileView
 */
export default class ProfileView extends BaseView {
  constructor(el, eventBus) {
    super(el, eventBus, template);
    //this._eventBus.trigger("auth_check");
  }
}