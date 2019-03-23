import {RENDER_TYPES} from '../../utils/constants.js';
import {makeSafe} from '../../utils/safe.js';

import template from './Rules.tmpl.xml';

export class RulesComponent {
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
    // this._el.innerHTML = window.fest['./Rules.tmpl']();
    this._el.innerHTML = this._fest();
  }

  render() {
    this.__renderTmpl();
  }
}