import GameCore from '../../game/core/index';
import events from './events';
import bus from '../../bus';

const rand = require('rand');

export default class OfflineGame extends GameCore {
	constructor(controller, scene) {
		super(controller, scene);

		this.state = {};
		this.gameloop = this.gameloop.bind(this);
		this.gameloopRequestId = null;
		this.lastFrame = 0;
	}

	start() {
		super.start();
		this.state = {
			plates: [
				{ x: 50, y: 100},
				{ x: 250, y: 445},
				{ x: 100, y: 305},
				{ x: 350, y: 205}
			],
			me: {
				x: 150,
				y: 0,
				dx: 0,
				dy: 0
			}
		};

		setTimeout(function () {
			bus.emit(events.START_GAME, this.state);
		}.bind(this));
	}

	gameloop(now) {
		const delay = now - this.lastFrame;
		this.lastFrame = now;

		bus.emit(events.GAME_STATE_CHANGED, this.state);


		this.gameloopRequestId = requestAnimationFrame(this.gameloop);
	}

	onControllsPressed(evt) {
		console.log(this._pressed('LEFT', evt));
		if (this._pressed('LEFT', evt)) {
			this.scene.moveLeft(evt);
			// this.state.me.x += -10;
			// this.state.me.y += -10;
		} else if (this._pressed('RIGHT', evt)) {
			this.state.me.x += -10;
			this.state.me.y += -10;
		} else if (this._pressed('FIRE', evt)) {
			// const coll = this.state.me.coll;
			// const arr = [
			// 	this.state.items[10 + coll],
			// 	this.state.items[5 + coll],
			// 	this.state.items[coll]
			// ];
		} 
	}

	onPressedLeftControl(evt) {
		console.log(this.scene.moveLeft);
		if (this._pressed('LEFT', evt)) {
			this.scene.moveLeft(evt);
		}
	}

	onPressedRightControl(evt) {
		if (this._pressed('RIGHT', evt)) {
			this.scene.moveRight(evt);
		}
	}


	onGameStarted(evt) {
		this.controller.start();	// начинаем слушать события нажатий клавиш
		this.scene.init(evt);	// 
		this.scene.start();

		this.lastFrame = performance.now();
		this.gameloopRequestId = requestAnimationFrame(this.gameloop);
	}

	onGameFinished(evt) {
		cancelAnimationFrame(this.gameloopRequestId);

		bus.emit('CLOSE_GAME');
	}

	onGameStateChanged(evt) {
		this.scene.setState(evt);
	}
};