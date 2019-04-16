import {
  getScoreBoard, checkStatus, parseJSON,
} from '../modules/api';
import User from '../modules/user';

/**
 * Таблица лидеров
 * Проверяет авторизацию и загружает инфу о пользователях
 */
export default class ScoreBoardModel {
  constructor(eventBus) {
    this.eventBus = eventBus;
    this.page = 1;
    this.pages = 1;
    this.eventBus.on('ready', (data) => {
      console.log(data); // data понадобится для отображения пользователя
      this.makeTable();
    });

    this.eventBus.on('view_show', () => {
      this.waitAction();
    });
  }

  async makeTable() {
    try {
      const res = await getScoreBoard(this.page);
      const status = await checkStatus(res);
      const data = await parseJSON(status);
      console.log('score ok');
      console.log(data);
      this.page = data.page;
      this.pages = data.pages;
      window.history.replaceState(null, '', `/users/${this.page}`);
      const totalData = Object.assign(data, User);
      console.log(totalData);
      this.eventBus.trigger('render', totalData);
      this.eventBus.trigger('show', totalData);
    } catch (err) {
      console.log('score bad');
      console.log(err);
    }
  }

  waitAction() {
    const [buttonForw] = document.getElementsByClassName('paginator__next');
    buttonForw.addEventListener('click', (event) => {
      event.preventDefault();
      console.log('PAGE FORW');
      if (this.page < this.pages) {
        this.page += 1;
        this.makeTable();
      } else {
        this.waitAction();
      }
    });

    const [buttonBack] = document.getElementsByClassName('paginator__prev');
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
