import BaseView from './BaseView';
import template from '../components/signin/signin.handlebars';

const signin_fields = {
  inputFields: 
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
  constructor(el, eventBus) {
    super(el, eventBus, template);

    this.eventBus.on('valid_err', (data) => {
      this.render(this.el, data);
    });

    this.eventBus.on('signin_bad', (data) => {
      this.render(this.el, data);
    });
  }

  render(root, data = {}) {
    data = signin_fields;
    this.el = root;
    this.el.innerHTML = '';
    this.components.forEach(component => this.el.innerHTML += component.getTemplate(data));
    this.el.innerHTML += this.template(data);
    this.rendered = true;
  }
}
