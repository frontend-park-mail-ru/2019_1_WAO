/**
 * BaseView view
 * @class BaseView
 */

export default class BaseView {
	constructor({
		el = document.body
	} = {}) {
		this._el = el;
		this._template = template;
	}

	/**
	 * Устанавливаем данные для отрисовки формы
	 *@param {Array} d - входной массив данных
	 */
	set data(d = []) {
		this._data = d;
	}

	/**
	 * Рендер страницы
	 */
	render() {
		this._el.innerHTML = this._template();
	}

	/**
	 * 
	 */
	close() {

	}
}