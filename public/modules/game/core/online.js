import GameCore from '../../game/core/index';
import bus from '../../bus';
import Ws from '../../ws';

const ws = new Ws();

export default class OnlineGame extends GameCore {

	start() {
		super.start();

		ws.send('start-game', null);
	}

	onControllsPressed(evt) {
		if (this._pressed('LEFT', evt)) {
			ws.send('game-command', 'LEFT');
		} else if (this._pressed('RIGHT', evt)) {
			ws.send('game-command', 'RIGHT');
		} else if (this._pressed('FIRE', evt)) {
			ws.send('game-command', 'FIRE');
		}
	}

	onGameStarted(evt) {
		this.controller.start();
		this.scene.init(evt);
		this.scene.start();
	}

	onGameFinished(evt) {
		bus.emit('CLOSE_GAME');
	}

	onGameStateChanged(evt) {
		this.scene.setState(evt);
	}
}