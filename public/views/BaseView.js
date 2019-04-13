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
  constructor(el, eventBus, template, components = [], vievData = {}) {
    this.el = el || document.createElement('div');
    this.eventBus = eventBus;
    this.template = template;
    this.components = components;
    this.vievData = vievData;
    this.rendered = false;
    this.savedTmpl = '';
    this.hide();

    this.eventBus.on('render', (data) => {
      // this.show();
      this.render(this.el, data);
      this.el.style.display = null;
      this.eventBus.trigger('view_show');
    });
  }

  /**
   * Рендер вьюхи
   * @param {document.body} - элемент, в который вставить вьюху
   * @param {Array} data - входной массив данных
   */
  render(root, data = {}) {
    this.el = root;
    // this.el.innerHTML = '';
    this.savedTmpl = '';
    const temp = Object.assign(this.vievData, data);
    // this.el.innerHTML += this.template(temp);
    // this.components.forEach(component => this.el.innerHTML += component.getTemplate(data));
    this.savedTmpl += this.template(temp);
    this.components.forEach(component => this.savedTmpl += component.getTemplate(data));
    this.el.innerHTML = Object.assign(this.savedTmpl);
    this.rendered = true;
  }

  /**
   * Показать вьюху
   */
  show() {
    this.render(this.el);
    // if (!this.rendered) {
    //  this.render(this.el);
    // }
    this.el.style.display = null;
    this.eventBus.trigger('view_show');
  }

  /**
   * Убрать вьюху
   */
  hide() {
    this.el.style.setProperty('display', 'none', 'important');
    this.eventBus.trigger('view_hide');
  }

  getTemplate(data = {}) {
    if (this.rendered) {
      return this.savedTmpl;
    }
    return this.template(data);
  }
}
