/**
 * Представитель Меню
 * @class MenuPresenter
 */
export default class BasePresenter {
  /**
   * Конструктор
   * Создает Модель и Представление элемента, а также презентереов включаемых компонентов
   * Подписывается на события
   */
  constructor(view, model, eventBus) {
    this.view = view;
    this.model = model;
    this.eventBus = eventBus;
  }

  call(data = {}) {
    this.eventBus.trigger('call', data);
  }

  // eslint-disable-next-line class-methods-use-this
  stop() {
    // this.view.hide();
    this.eventBus.trigger('hide');
  }
}
