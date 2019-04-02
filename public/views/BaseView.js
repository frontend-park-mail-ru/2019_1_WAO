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
  constructor(el, eventBus, template) {
    this.el = el || document.createElement('div');
    this.eventBus = eventBus;
    this.template = template;
    this.rendered = false;
    this.hide();
  }

  /**
   * Рендер вьюхи
   *@param {document.body} - элемент, в который вставить вьюху
   *@param {Array} data - входной массив данных
   */
  render(root, data = {}) {
    this.el = root;
    this.el.innerHTML = this.template(data);
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
    this.render(this.el);
    this.el.style.setProperty('display', 'none', 'important');
    this.eventBus.trigger('view_hide');
  }
}
