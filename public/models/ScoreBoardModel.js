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
    this.eventBus.on('call', () => {
      this.eventBus.trigger('render');      
      this.makeTable();
    });
  }

  makeTable() {
    getScoreBoard(this.page)
      .then(checkStatus)
      .then(parseJSON)
      .then((data) => {
        console.log('score ok');
        this.eventBus.trigger('users_rx', {users: data});
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
    const [buttonForw] = document.getElementsByClassName('scoreboard__paginator__next');
    buttonForw.addEventListener('click', (event) => {
      event.preventDefault(); 
      console.log('PAGE FORW');
      const maxPage = 3; // да, это костыль. ведь код без костылей - не живой код
      if (this.page < maxPage) {
        this.page += 1;
        this.makeTable();
      } else {
        this.waitAction();
      }
    });

    const [buttonBack] = document.getElementsByClassName('scoreboard__paginator__prev');
    buttonBack.addEventListener('click', (event) => {
      event.preventDefault(); 
      console.log('PAGE BACK');
      if (this.page > 1) {
        this.page -= 1;
        this.makeTable();
      } else {
        this.waitAction();
      }
    });
   }
}
