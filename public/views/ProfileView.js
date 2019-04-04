import BaseView from './BaseView';
import template from '../components/profile/profile.tmpl.xml';
import User from '../modules/user';

/**
 * ProfileView view
 * @class ProfileView
 */
export default class ProfileView extends BaseView {
  /**
   * Конструктор класса View
   * @param {document.body} el Куда отображать
   * @param {EventBus} eventBus Локальная шина событий
   */
  constructor(el, eventBus, components = []) {
    super(el, eventBus, template, components);

    this.eventBus.on('valid_err', (data) => {
      this.render(this.el, data);
    });

    this.eventBus.on('signup_bad', (data) => {
      this.render(this.el, data);
    });
  }

  render(root, data = {}) {
    // возможно стоит это вынести в BaseView
    // но сначала потестим тут
    // User нужен, чтобы выставить поля в шаблоне по умолчанию
    data = {
      data: User,
      err: {},
    };
    this.el = root;
    this.el.innerHTML = '';
    this.components.forEach(component => this.el.innerHTML += component.getTemplate(data));
    this.el.innerHTML += this.template(data);
    this.rendered = true;
  }
}
