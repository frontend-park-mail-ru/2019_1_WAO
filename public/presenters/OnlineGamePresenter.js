import { EventBus, GlobalBus } from '../modules/eventbus';
import Game from '../modules/game/game';
import { GAME_MODES } from '../modules/game/modes';
import GameView from '../views/GameView';
import User from '../modules/user';
import BasePresenter from './BasePresenter';
import Loader from '../components/loader/loader';

/**
 * Представитель Игры
 * @class GamePresenter
 */
export default class OnlineGamePresenter extends BasePresenter {
  /**
   * Конструктор
   * Создает Модель и Представление элемента, а также презентереов включаемых компонентов
   * Подписывается на события
   */
  constructor(elements) {
    const [appEl] = elements;
    const eventBus = new EventBus();
    const view = new GameView(appEl, eventBus);
    super(view, {}, eventBus);
    this.appEl = appEl;

    // this.appEl = appEl;
    // this.loader = document.createElement('div');
    // this.appEl.appendClild(this.loader);
    // this.loader.innerHTML = template();

    GlobalBus.on('gap_changed', (gap) => {
      console.log('gap_changed', gap);
      if (gap >= 0) {
        document.documentElement.style.setProperty('--barGood', `${gap}%`);
        document.documentElement.style.setProperty('--barBad', '0%');
      } else {
        gap *= -1;
        document.documentElement.style.setProperty('--barGood', '0%');
        document.documentElement.style.setProperty('--barBad', `${gap}%`);
      }
    });

    GlobalBus.on('init_players', () => {
      console.log('Players - init');
      this.loader.loader.style.setProperty('display', 'none', 'important');
    });
  }

  call() {
    let rand = 0.5 + 3 * Math.random();
    rand = Math.round(rand);
    this.audio = new Audio(`./sounds/media${rand}.mp3`);
    this.audio.play();
    if (User.isAuth) {
      this.view.render();

      this.loader = new Loader(this.appEl);

      const [canvas] = document.getElementsByClassName('game-view__canvas');
      this.view.canvas = canvas;
      const [scoreField] = document.getElementsByClassName('game-bar__score-value');
      this.game = new Game(GAME_MODES.ONLINE, this.view.canvas, scoreField);
      this.game.start();
    } else {
      GlobalBus.trigger('auth_bad');
    }
  }

  // eslint-disable-next-line class-methods-use-this
  stop() {
    this.audio.pause();
    console.log('game close');
    // console.log("OnlineGamePresenter");
    this.game.destroy();
    // EventBus.trigger("")
  }
}
