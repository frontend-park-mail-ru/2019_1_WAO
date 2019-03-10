import {RENDER_TYPES} from '../../utils/constants.js';
import {makeSafe} from '../../utils/safe.js';

import template from './ScoreProfile.tmpl.xml';

export class ScoreProfileComponent {
	constructor({
		el = document.body,
		type = RENDER_TYPES.TMPL,
	} = {}) {
		this._el = el;
		this._type = type;
		this._fest = template;
	}

	get data() {
		return this._data;
	}

	set data(d = []) {
		this._data = d;
	}

	__renderTmpl() {
		this._el.innerHTML = this._fest(this._data);
	}

	render() {
		this.__renderTmpl();
	}
}