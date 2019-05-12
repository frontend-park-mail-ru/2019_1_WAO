import { GAME_MODES } from './modes';
import OfflineGame from './core/offline';
import OnlineGame from './core/online';
import GameScene from './game-scene/index';
import GameControllers from './controllers';

export default class Game {
  constructor(mode, canvas, scorePlace) {
    let GameConstructor = null;
    switch (mode) {
      case GAME_MODES.ONLINE: {
        GameConstructor = OnlineGame;
        break;
      }
      case GAME_MODES.OFFLINE: {
        GameConstructor = OfflineGame;
        break;
      }
      default:
        throw new Error(`Invalid game mode ${mode}`);
    }

    this.gameScene = new GameScene(canvas);
    this.gameControllers = new GameControllers(canvas);

    this.gameCore = new GameConstructor(this.gameControllers, this.gameScene, scorePlace);
  }

  start() {
    this.gameCore.start();
  }

  destroy() {
    // this.gameCore.destroy();
    this.gameCore.destroy(); 
    this.gameCore = null;
  }
}
