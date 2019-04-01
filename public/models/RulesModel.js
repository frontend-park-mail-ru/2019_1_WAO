import { getAuth, checkStatus, parseJSON } from '../modules/api';

/**
 * Модель Правил
 */
export default class RulesModel {
  constructor(eventBus) {
    this.eventBus = eventBus;
    this.eventBus.on('view_show', () => {
      this.checkAuth();
    });
  }

  /**
   * Проверка авторизации
   * Неавторизованный пользоватеь ни в коем случае не должен узнать правила
   */
  checkAuth() {
    getAuth()
      .then(checkStatus)
      .then(parseJSON)
      .then((data) => {
        console.log('menu auth ok');
        console.log(data);
      })
      .catch(() => {
        console.log('menu auth bad');
        this.eventBus.trigger('auth_bad');
      });
  }
}
