import BaseView from './BaseView';
import template from '../components/signin/signin.tmpl.xml';

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

    this.eventBus.on('valid_err', (data) => {
      this.render(this.el, data);
    });

    this.eventBus.on('signin_bad', (data) => {
      this.render(this.el, data);
    });
  }
}
