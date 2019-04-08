import { GlobalBus } from '../modules/eventbus';

/**
 * Модель Меню
 */
export default class UserbarModel {
  /**
   * Конструктор. Подписывает на проверку авторизации
   * @param {EventBus} eventBus
   */
  constructor(eventBus) {
    this.eventBus = eventBus;  
    this.eventBus.on('call', () => {
      console.log('call');
      // this.waitAction();
    });
  }

  /**
   * Отклик на клики позльзователя
   */
   waitAction() {
    const [buttonOut] = document.getElementsByClassName('userbar__door');
    buttonOut.addEventListener('click', (event) => {
      event.preventDefault(); 
      console.log('PRESS OUT');
      GlobalBus.trigger('auth_out');
    });
   }
}
