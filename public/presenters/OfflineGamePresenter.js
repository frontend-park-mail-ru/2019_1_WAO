import { EventBus } from '../modules/eventbus';
import Game from '../modules/game/game';
import { GAME_MODES } from '../modules/game/modes';
import GameView from '../views/GameView';
import BasePresenter from './BasePresenter';
// import Loader from '../components/loader/loader';

/**
 * Представитель Игры
 * @class GamePresenter
 */
export default class OfflineGamePresenter extends BasePresenter {
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
    // this.appEl = appEl;

    // GlobalBus.on('gap_changed', (gap) => {
    //   if (gap >= 100) {
    //     document.body.style.setProperty('--barGood', `${gap}%`);
    //     document.body.style.setProperty('--barBad', '0%');
    //   } else {
    //     gap *= -1;
    //     document.body.style.setProperty('--barGood', '0%');
    //     document.body.style.setProperty('--barBad', `${gap}%`);
    //   }
    // });
  }

  call() {
    let rand = 0.5 + 3 * Math.random();
    rand = Math.round(rand);
    this.audio = new Audio(`./sounds/media${rand}.mp3`);
    this.audio.play();
    this.view.render();
    this.checkMobile();
    // this.loader.show();
    // this.loader = new Loader(this.appEl);

    const [bar1] = document.getElementsByClassName('game-progress__good');
    const [bar2] = document.getElementsByClassName('game-progress__bad');
    bar1.style.setProperty('display', 'none', 'important');
    bar2.style.setProperty('display', 'none', 'important');
    const [canvas] = document.getElementsByClassName('game-view__canvas');
    this.view.canvas = canvas;
    const [scoreField] = document.getElementsByClassName('game-bar__score-value');
    document.body.style.setProperty('--barGood', '0%');
    document.body.style.setProperty('--barBad', '0%');
    this.game = new Game(GAME_MODES.OFFLINE, this.view.canvas, scoreField);
    this.game.start();
  }

  // eslint-disable-next-line class-methods-use-this
  stop() {
    this.audio.pause();
    console.log('game close');
    this.game.destroy();
  }

  // eslint-disable-next-line class-methods-use-this
  checkMobile() {
    const [block] = document.getElementsByClassName('block-content');
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent)) {
      console.log('mobile');
      block.style.display = 'block';
    } else {
      console.log('desktop');
      block.style.display = 'none';
    }
  }
}
