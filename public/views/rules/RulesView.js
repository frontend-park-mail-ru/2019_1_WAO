import BaseView from '../view/BaseView.js';
import template from './Rules.tmpl.xml';

/**
 * RulesView view
 * @class RulesView
 */
export default class RulesView extends BaseView {
  constructor(el, eventBus) {
    super(el, eventBus, template);
    //this._eventBus.trigger("auth_check");
  }
}