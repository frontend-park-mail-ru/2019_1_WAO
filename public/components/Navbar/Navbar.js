import { RENDER_TYPES } from '../../utils/constants';
import template from './Navbar.tmpl.xml';

/**
 * Класс навбара
 */
export default class NavbarComponent {
  /**
   * Конструктор для навбара 
   * @param {document.body} el Куда рендерить
   */
  constructor({
    el = document.body
  } = {}) {
    this.el = el;
    this.type = type;
    this.fest = template;
  }

  /**
   * Рендер шаблона
   */
  render() {
    this.el.innerHTML = this.fest();
  }

  /**
   * Создает навбар
   */
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
