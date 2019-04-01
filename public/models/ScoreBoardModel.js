import {
  getAuth, getScoreBoard, checkStatus, parseJSON,
} from '../modules/api';

/**
 * Таблица лидеров
 * Проверяет авторизацию и загружает инфу о пользователях
 */
export default class ScoreBoardModel {
  constructor(eventBus) {
    this.eventBus = eventBus;
    this.eventBus.on('view_show', () => {
      this.checkAuth();
    });
  }

  /**
   * Проверяет авторизацию и загружает инфу о пользователях
   */
  checkAuth() {
    getAuth()
      .then(checkStatus)
      .then(() => getScoreBoard(1))
      .then(checkStatus)
      .then(parseJSON)
      .then((data) => {
        console.log('score auth ok');
        this.eventBus.trigger('users_rx', data);
        console.log(data);
      })
      .catch(() => {
        console.log('score auth bad');
        this.eventBus.trigger('auth_bad');
      });
  }
}
