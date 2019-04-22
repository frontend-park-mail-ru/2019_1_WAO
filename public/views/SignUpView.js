import BaseView from './BaseView';
import template from '../components/signup/signup.hbs';
import '../components/signup/signup.css';

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
        placeholder: 'Почта',
      },
      {
        label: 'Пароль',
        type: 'password',
        name: 'password',
        placeholder: 'Пароль',
      },
      {
        label: 'Пароль еще раз',
        type: 'password',
        name: 'passwordRepeat',
        placeholder: 'Повторите пароль',
      },
    ],
  button: {
    value: 'Зарегистрироваться',
  },
  title: {
    text: 'Регистрация',
  },
  sign: {
    text: 'Обратно',
    href: '/signin',
  },
};

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
