import BaseView from '../view/BaseView';
import template from './profile.tmpl.xml';

/**
 * ProfileView view
 * @class ProfileView
 */
export default class ProfileView extends BaseView {
  constructor(el, eventBus) {
    super(el, eventBus, template);
  }
}
