import { EventBus } from '../modules/eventbus';
import Game from '../modules/game/game';
import { GAME_MODES } from '../modules/game/modes';
import GameView from '../views/GameView';

/**
 * Представитель Игры
 * @class GamePresenter
 */
export default class GamePresenter {
  /**
   * Конструктор
   * Создает Модель и Представление элемента, а также презентереов включаемых компонентов
   * Подписывается на события
   */
  constructor(element) {
    const eventBus = new EventBus();
    this.eventBus = eventBus;

    this.view = new GameView(element, this.eventBus);
  }

  call() {
    this.view.render();
    const [canvas] = document.getElementsByClassName('game-view__canvas');
    this.view.canvas = canvas;
    this.game = new Game(GAME_MODES.OFFLINE, this.view.canvas);
    this.game.start();
  }

  // eslint-disable-next-line class-methods-use-this
  stop() {
    console.log('game close');
  }
}
