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
    this.eventBus.on('view_rend', () => {
      console.log('view_rend');
      // this.waitAction();
    });    
    this.eventBus.on('view_show', () => {
      console.log('view_show');
      this.waitAction();
    });
  }

  /**
   * Отклик на клики позльзователя
   */
   waitAction() {
    const [buttonOut] = document.getElementsByClassName('navbar_user');
    buttonOut.addEventListener('click', (event) => {
      event.preventDefault(); 
      console.log('PRESS OUT');
      GlobalBus.trigger('auth_out');
    });
   }
}
