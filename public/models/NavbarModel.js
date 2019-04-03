import { GlobalBus } from '../modules/eventbus';

/**
 * Модель Меню
 */
export default class NavbarModel {
  /**
   * Конструктор. Подписывает на проверку авторизации
   * @param {EventBus} eventBus
   */
  constructor(eventBus) {
    this.eventBus = eventBus;
    this.waitAction();
  }

  /**
   * Отклик на клики позльзователя
   */
   waitAction() {       
    const [buttonOut] = document.getElementsByClassName('navbar_user');
    buttonOut.addEventListener('click', (event) => {
      event.preventDefault(); 
      GlobalBus.trigger('auth_out');
    });
   }
}
