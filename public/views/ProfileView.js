import BaseView from './BaseView';
import template from '../components/profile/profile.tmpl.xml';
import NavbarTemplate from '../components/navbar/Navbar.tmpl.xml';

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
  constructor(el, eventBus) {
    super(el, eventBus, template);

    this.eventBus.on('valid_err', (data, err) => {
      this.render(this.el, data, err);
    });

    this.eventBus.on('signup_bad', (data, err) => {
      this.render(this.el, data, err);
    });
  }

  render(root, data = {}, err = {}) {
    this.el = root;
    this.el.innerHTML = NavbarTemplate();
    this.el.innerHTML += this.template({data, err});
    this.rendered = true;
  }
}
