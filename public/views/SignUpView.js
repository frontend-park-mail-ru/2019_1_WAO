import BaseView from './BaseView';
import template from '../components/signup/signup.handlebars';

const vievData = {
  fields : 
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
        name: 'password_repeat',
        placeholder: 'Повторите пароль',
      },
    ],
    button: {
      value: 'Зарегистрироваться'
    },
    title: {
      text: 'Регистрация',
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
    super(el, eventBus, template, components, vievData);

    this.eventBus.on('valid_err', (data) => {
      this.render(this.el, data);
    });

    this.eventBus.on('signup_bad', (data) => {
      this.render(this.el, data);
    });
  }
}
