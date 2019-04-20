import '../components/common/common.css';
import '../components/form-button/form-button.css';
import '../components/input/input.css';
import '../components/paginator/paginator.css';
import '../components/title/title.css';

/**
 * Базовый клас View
 * @class BaseView
 */
export default class BaseView {
  /**
   * Конструктор класса View
   * @param {document.body} el Куда отображать
   * @param {EventBus} eventBus Локальная шина событий
   * @param {String} template Шаблон страницы
   */
  constructor({
    el = document.createElement('div'),
    eventBus,
    template,
    components = [],
    viewData = {},
    viewEvent = 'view_show',
  } = {}) {
    this.el = el;
    this.eventBus = eventBus;
    this.template = template;
    this.components = components;
    this.viewData = viewData;
    this.rendered = false;
    this.savedTmpl = '';
    this.hide();

    this.eventBus.on('render', (data) => {
      this.render(this.el, data);
      // this.show(data); // показывать надо не сразу
      this.eventBus.trigger('view_rend');
    });

    this.eventBus.on('show', (data) => {
      this.render(this.el, data);
      this.show(data);
      this.eventBus.trigger(viewEvent);
    });

    this.eventBus.on('hide', () => {
      this.hide();
    });
  }

  /**
   * Рендер вьюхи
   * @param {document.body} - элемент, в который вставить вьюху
   * @param {Array} data - входной массив данных
   */
  render(root, data = {}) {
    this.el = root;
    const temp = Object.assign(this.viewData, data);
    this.savedTmpl = '';
    this.savedTmpl += this.template(temp);
    // this.components.forEach((component) => {
    //   this.savedTmpl += component.getTemplate(data);
    // });
    this.rendered = true;
  }

  /**
   * Показать вьюху
   */
  show(data = {}) {
    if (!this.rendered) {
      this.render(this.el, data);
    }
    this.el.innerHTML = Object.assign(this.savedTmpl);
    this.el.style.display = null;
  }

  /**
   * Убрать вьюху
   */
  hide() {
    this.el.style.setProperty('display', 'none', 'important');
    this.el.innerHTML = '';
    this.eventBus.trigger('view_hide');
  }

  getTemplate(data = {}) {
    if (this.rendered) {
      return this.savedTmpl;
    }
    return this.template(data);
  }
}
