import { RENDER_TYPES } from '../../utils/constants.js';
import { makeSafe } from '../../utils/safe.js';

import template from './ScoreBoard.tmpl.xml';

export class ScoreBoardComponent {
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
    // this._el.innerHTML = window.fest['./ScoreBoard.tmpl'](this._data);
    this._el.innerHTML = this._fest(this._data);
  }

  render() {
    this.__renderTmpl();
  }
}
