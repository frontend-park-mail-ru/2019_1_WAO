import { RENDER_TYPES } from '../../utils/constants';
import template from './Navbar.tmpl.xml';

export default class NavbarComponent {
  constructor({
    el = document.body,
    type = RENDER_TYPES.TMPL,
  } = {}) {
    this.el = el;
    this.type = type;
    this.fest = template;
  }

  renderTmpl() {
    this.el.innerHTML = this.fest();
  }

  render() {
    this.renderTmpl();
  }

  create() {
    const application = document.getElementById('application');
    const navbarSection = document.createElement('section');
    navbarSection.dataset.sectionName = 'navbar';

    this.el = navbarSection;
    this.type = RENDER_TYPES.TMPL;

    this.render();
    application.appendChild(navbarSection);
  }
}
