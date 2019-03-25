//import {eventBus} from '../modules/eventbus.js';

/**
 * BaseView view
 *@class BaseView
 */
export default class BaseView {
  constructor(el, eventBus, template) {
    this._template  = template;
    this._el = el || document.createElement('div');
    this._eventBus = eventBus;
    this._rendered = false;
    this.hide();
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
  render(root, data = []) { // root == _el !! но зачем?
    this._el.innerHTML = this._template(data);
    //root.innerHTML = '';
    //root.appendChild(this._el);
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
    this._eventBus.trigger('view_show');
  }

  /**
   * Убрать вьюху
   */
  hide() {
    this._isActive = false;
    this._el.style.setProperty('display', 'none', 'important');
    this._eventBus.trigger('view_hide');
  }
}
