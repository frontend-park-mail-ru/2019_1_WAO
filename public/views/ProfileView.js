import BaseView from './BaseView';
import template from '../components/profile/profile.hbs';

const viewData = {
  button: {
    value: 'Редактировать',
  },
  isAuth: false,
  title: {
    text: 'Профиль',
  },
};

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
    super({
      el,
      eventBus,
      template,
      components,
      viewData,
    });

    this.eventBus.on('valid_err', (data) => {
      this.render(this.el, data);
    });

    this.eventBus.on('signup_bad', (data) => {
      this.render(this.el, data);
    });
  }
}
