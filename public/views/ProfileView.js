import BaseView from './BaseView';
import template from '../components/profile/profile.hbs';
import '../components/profile/profile.scss';

const viewData = {
  fields:
    [
      {
        label: 'Логин',
        type: 'text',
        name: 'nickname',
        placeholder: 'Логин',
      },
      {
        label: 'Email',
        type: 'text',
        name: 'email',
        placeholder: 'Логин',
      },
      {
        label: 'Пароль',
        type: 'password',
        name: 'password',
        placeholder: 'Введите новый пароль',
        icon: './images/access.svg',
      },
    ],
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
  constructor(el, eventBus) {
    super({
      el,
      eventBus,
      template,
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
