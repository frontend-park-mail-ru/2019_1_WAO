import BaseView from './BaseView';
import template from '../components/signin/signin.handlebars';

const vievData = {
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
      },
    ],
  button: {
    value: 'Войти'
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
  constructor(el, eventBus, components = []) {
    super(el, eventBus, template, components, vievData);

    this.eventBus.on('valid_err', (data) => {
      this.render(this.el, data);
    });

    this.eventBus.on('signin_bad', (data) => {
      this.render(this.el, data);
    });
  }
}
