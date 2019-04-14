import events from './events';
import bus from '../../bus';

const KEYS = {
	FIRE: [' ', 'Enter'],
	LEFT: ['a', 'A', 'ф', 'Ф', 'ArrowLeft'],
	RIGHT: ['d', 'D', 'в', 'В', 'ArrowRight'],
};

export default class GameCore {
	constructor(controller, scene) {
		this.controller = controller;
		this.scene = scene;

		this.onGameStarted = this.onGameStarted.bind(this);
		this.onGameFinished = this.onGameFinished.bind(this);
		this.onControllsPressed = this.onControllsPressed.bind(this);
		this.onGameStateChanged = this.onGameStateChanged.bind(this);
		// my
		this.onPressedLeftControl = this.onPressedLeftControl.bind(this);
		this.onPressedRightControl = this.onPressedRightControl.bind(this);
		// this._pressed = this._pressed.bind(this);
		// -//-
		this.controllersLoopIntervalId = null;
	}

	start() {
		bus.on(events.START_GAME, this.onGameStarted);
		bus.on(events.FINISH_GAME, this.onGameFinished);
		bus.on(events.CONTROLS_PRESSED, this.onControllsPressed);
		bus.on(events.GAME_STATE_CHANGED, this.onGameStateChanged);

		bus.on(events.PRESSED_LEFT_CONTROL, this.onPressedLeftControl);
		bus.on(events.PRESSED_RIGHT_CONTROL, this.onPressedRightControl);

		const controller = this.controller;
		this.controllersLoopIntervalId = setInterval(function () {
			// const actions = controller.diff();		// Получаем предыдущую нажатую кнопку
			// console.log("Action: ", actions);
			/*if (Object.keys(actions).some(k => actions[k])) {	// если actions не пуст, а пришел с чем-то то сработает
				bus.emit(events.CONTROLS_PRESSED, actions);
			}*/
			const actions = controller.costumeControl();
			if ( actions.arrowleft === "true" ) {
				bus.emit(events.PRESSED_LEFT_CONTROL, actions);
			} else {
				bus.emit(events.PRESSED_RIGHT_CONTROL, actions);
			}
		}, 10);
	}

	destroy() {
		clearInterval(this.controllersLoopIntervalId);
		bus.off(events.START_GAME, this.onGameStarted);
		bus.off(events.FINISH_GAME, this.onGameFinished);
		bus.off(events.CONTROLS_PRESSED, this.onControllsPressed);
		bus.off(events.GAME_STATE_CHANGED, this.onGameStateChanged);

		this.controller.destroy();
		this.scene.stop();
	}

	onPressedLeftControl(evt) {
		throw new Error('This method must be overridden');
	}

	onPressedRightControl(evt) {
		throw new Error('This method must be overridden');
	}

	onControllsPressed(evt) {
		throw new Error('This method must be overridden');
	}

	onGameStarted(evt) {
		throw new Error('This method must be overridden');
	}

	onGameFinished(evt) {
		throw new Error('This method must be overridden');
	}

	onGameStateChanged(evt) {
		throw new Error('This method must be overridden');
	}

	_pressed(name, data) {
		return KEYS[name].some(k => data[k.toLowerCase()]);	// Проверяет была ли нажата кнопка из списка KEYS
	}
};