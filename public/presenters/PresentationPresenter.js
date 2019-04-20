import PresentationView from '../views/PresentationView';

/**
 * Представитель Игры
 * @class GamePresenter
 */
export default class GamePresenter {
  /**
   * Конструктор
   * Создает Модель и Представление элемента, а также презентереов включаемых компонентов
   * Подписывается на события
   */
  constructor() {
    const application = document.getElementById('application');

    this.view = new PresentationView(application);
  }

  call() {
    this.view.render();
  }

  // eslint-disable-next-line class-methods-use-this
  stop() {
    console.log('presentation close');
  }
}
