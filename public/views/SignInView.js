import BaseView from './BaseView';
import template from '../components/signin/signin.hbs';
import '../components/signin/signin.css';

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
        label: 'Пароль',
        type: 'password',
        name: 'password',
        placeholder: 'Пароль',
        icon: './images/access.svg',
      },
    ],
  button: {
    value: 'Войти',
  },
  title: {
    text: 'Войти',
  },
  sign: {
    text: 'Регистрация',
    href: '/signup',
  },
  menu: {
    text: 'В меню',
    href: '/',
  },
};

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
    super({
      el,
      eventBus,
      template,
      viewData,
    });

    this.eventBus.on('valid_err', (data) => {
      this.render(this.el, data);
    });

    this.eventBus.on('signin_bad', (data) => {
      this.render(this.el, data);
    });
  }
}
