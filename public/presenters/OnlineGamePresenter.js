import { EventBus, GlobalBus } from '../modules/eventbus';
import Game from '../modules/game/game';
import { GAME_MODES } from '../modules/game/modes';
import GameView from '../views/GameView';
import User from '../modules/user';
import BasePresenter from './BasePresenter';

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
  }


  call() {
    if (User.isAuth) {
      this.view.render();
      const [canvas] = document.getElementsByClassName('game-view__canvas');
      this.view.canvas = canvas;
      this.game = new Game(GAME_MODES.ONLINE, this.view.canvas);
      this.game.start();
    } else {
      GlobalBus.trigger('auth_bad');
    }
  }

  // eslint-disable-next-line class-methods-use-this
  stop() {
    console.log('game close');
  }
}
