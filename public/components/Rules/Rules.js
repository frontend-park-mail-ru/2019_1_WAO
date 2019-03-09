import {RENDER_TYPES} from '../../utils/constants.js';
import {makeSafe} from '../../utils/safe.js';

export class RulesComponent {
	constructor({
		el = document.body,
		type = RENDER_TYPES.TMPL,
	} = {}) {
		this._el = el;
		this._type = type;
	}

	get data() {
		return this._data;
	}

	set data(d = []) {
		this._data = d;
	}

	__renderTmpl() {
		this._el.innerHTML = window.fest['./Rules.tmpl']();
	}

	render() {
		__renderTmpl();
	}
}