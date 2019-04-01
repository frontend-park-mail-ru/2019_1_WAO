import template from './ScoreProfile.tmpl.xml';

/**
 * Класс для карточки профиля пользователя
 */
export default class ScoreProfileComponent {
  /**
   * Конструктор класса
   * @param {document.body} el Куда рендерить
   */
  constructor({
    el = document.body,
  } = {}) {
    this.el = el;
    this.fest = template;
  }

  /**
   * Рендер шаблона
   */
  render() {
    this.el.innerHTML = this.fest(this.data);
  }
}
