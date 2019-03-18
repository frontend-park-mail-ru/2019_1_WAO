import {RENDER_TYPES} from '../../utils/constants.js';
import {makeSafe} from '../../utils/safe.js';

import template from './Navbar.tmpl.xml';

export class NavbarComponent {
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
		this._el.innerHTML = this._fest();
	}

	render() {
		this.__renderTmpl();
	}

	create() {
		const application = document.getElementById('application');
		const navbarSection = document.createElement('section');
		navbarSection.dataset.sectionName = 'navbar';	

		this._el = navbarSection;
		this._type = RENDER_TYPES.TMPL;

		this.render();
		application.appendChild(navbarSection);
	}
}