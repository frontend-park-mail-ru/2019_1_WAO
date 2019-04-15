import BaseView from './BaseView';
import template from '../components/userbar/userbar.hbs';
import '../components/userbar/userbar.css';

/**
 * UserbarView view
 * @class UserbarView
 */
export default class UserbarView extends BaseView {
  /**
   * Конструктор класса View
   * @param {document.body} el Куда отображать
   * @param {EventBus} eventBus Локальная шина событий
   */
  constructor(el, eventBus, components = []) {
    super({
      el,
      eventBus,
      template,
      components,
      viewData: {},
    });
  }
}
