import BaseView from '../view/BaseView';
import template from './signup.tmpl.xml';

/**
 * Singup view
 * @class MenuView
 */
export default class SignUpView extends BaseView {
  /**
   * Конструктор класса View
   * @param {document.body} el Куда отображать
   * @param {EventBus} eventBus Локальная шина событий
   */
  constructor(el, eventBus) {
    super(el, eventBus, template);
  }
}
