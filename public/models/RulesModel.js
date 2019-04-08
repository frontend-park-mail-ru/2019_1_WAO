import { getAuth, checkStatus, parseJSON } from '../modules/api';
import { GlobalBus } from '../modules/eventbus';

/**
 * Модель Правил
 */
export default class RulesModel {
  constructor(eventBus) {
    this.eventBus = eventBus;
    this.eventBus.on('call', () => {
      this.eventBus.trigger('render');
      RulesModel.checkAuth();
    });
  }

  /**
   * Проверка авторизации
   * Неавторизованный пользоватеь ни в коем случае не должен узнать правила
   */
  static checkAuth() {
    getAuth()
      .then(checkStatus)
      .then(parseJSON)
      .then((data) => {
        console.log('menu auth ok');
        console.log(data);
      })
      .catch(() => {
        console.log('menu auth bad');
        GlobalBus.trigger('auth_bad');
      });
  }
}
