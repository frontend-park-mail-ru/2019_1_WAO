/**
 * BaseView view
 * @class BaseView
 */

export default class BaseView {
  constructor(template, el, parent) {
    this._template  = template;
    this._parent    = parent;
    this._el = el || document.createElement('div');
    this._isActive = false;
    this._rendered = false;
  }

  /**
   * Вернуть состояние вьюхи
   */
  isActive() {
    return this._isActive;
  }

  /**
   * Была ли вьюха отрендерена ранее
   */
  rendered() {
    return this._rendered;
  }

  /**
   * Отрендерить вьюху
   *@param {Array} d - входной массив данных
   */
  render(root, data = []) {
    this._el.innerHTML = this._template(data);
    root.innerHTML = '';
    root.appendChild(this._el);
  }

  /**
   * Показать вьюху
   */
  show() {
    this._isActive = true;
    if (!this._rendered) {
      this.render();
    }
    this._el.style.display = null;
  }

  /**
   * Убрать вьюху
   */
  hide() {
    this._isActive = false;
    this._el.style.setProperty('display', 'none', 'important');
  }
}
