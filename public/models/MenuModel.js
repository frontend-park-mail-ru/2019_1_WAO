import { getAuth, checkStatus, parseJSON } from '../modules/api';

export default class MenuModel {
  constructor(eventBus) {
    this.eventBus = eventBus;
    this.eventBus.on('view_show', () => {
      this.checkAuth();
    });
  }

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
