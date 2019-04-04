import {
  getAuth, getScoreBoard, checkStatus, parseJSON,
} from '../modules/api';
import { GlobalBus } from '../modules/eventbus';

/**
 * Таблица лидеров
 * Проверяет авторизацию и загружает инфу о пользователях
 */
export default class ScoreBoardModel {
  constructor(eventBus) {
    this.eventBus = eventBus;
    this.page = 1;
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
      .then(() => {
        this.makeTable();
      })
      .catch(() => {
        console.log('score auth bad');
        GlobalBus.trigger('auth_bad');
      });
  }

  makeTable() {
    getScoreBoard(this.page)
      .then(checkStatus)
      .then(parseJSON)
      .then((data) => {
        console.log('score ok');
        this.eventBus.trigger('users_rx', data);
        console.log(data);
        // this.eventBus.trigger('url_change', this.page);
        window.history.replaceState(null, null, `/users/${this.page}`);
        this.waitAction();
      })
      .catch(() => {
        console.log('score bad');
      });
  }

  waitAction() {
    const [buttonForw] = document.getElementsByClassName('page_forw');
    buttonForw.addEventListener('click', (event) => {
      event.preventDefault(); 
      console.log('PAGE FORW');
      this.page += 1;
      this.makeTable();
    });

    const [buttonBack] = document.getElementsByClassName('page_back');
    buttonBack.addEventListener('click', (event) => {
      event.preventDefault(); 
      console.log('PAGE BACK');
      if (this.page > 1) {
        this.page -= 1;
      }
      this.makeTable();
    });
   }
}
