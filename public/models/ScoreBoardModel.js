import {
  getScoreBoard, checkStatus, parseJSON,
} from '../modules/api';

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

  async makeTable() {
    try {
      const res = await getScoreBoard(this.page);
      const status = await checkStatus(res);
      const data = await parseJSON(status);
      console.log('score ok');
      console.log(data);
      this.eventBus.trigger('users_rx', { users: data });
      console.log(data);
      window.history.replaceState(null, '', `/users/${this.page}`);
      this.waitAction();
    } catch (err) {
      console.log('score bad');
    }
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
