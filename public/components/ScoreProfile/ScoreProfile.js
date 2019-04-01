import { RENDER_TYPES } from '../../utils/constants';
import template from './ScoreProfile.tmpl.xml';

export default class ScoreProfileComponent {
  constructor({
    el = document.body,
    type = RENDER_TYPES.TMPL,
  } = {}) {
    this.el = el;
    this.type = type;
    this.fest = template;
  }

  set data(d = {}) {
    this.data = d;
  }

  renderTmpl() {
    this.el.innerHTML = this.fest(this.data);
  }

  render() {
    this.renderTmpl();
  }
}
