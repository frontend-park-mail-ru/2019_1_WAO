import { RENDER_TYPES } from '../../utils/constants.js';
import { makeSafe } from '../../utils/safe.js';
import { NavbarComponent } from '../Navbar/Navbar.js';

import template from './Menu.tmpl.xml';

export class MenuComponent {
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

    const navbar = new NavbarComponent();
    navbar.create();

    const menuSection = document.createElement('section');
    menuSection.dataset.sectionName = 'menu';

    this._el = menuSection;
    this._type = RENDER_TYPES.TMPL;

    this.render();
    application.appendChild(menuSection);
  }
}
