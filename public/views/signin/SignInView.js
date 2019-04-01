import BaseView from '../view/BaseView';
import template from './signin.tmpl.xml';

/**
 * Signin view
 * @class MenuView
 */
export default class SignInView extends BaseView {
  /**
   * Конструктор класса View
   * @param {document.body} el Куда отображать
   * @param {EventBus} eventBus Локальная шина событий
   */
  constructor(el, eventBus) {
    super(el, eventBus, template);
  }
}
