import { gameBus } from '../../eventbus';

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
    // this.onControllsPressed = this.onControllsPressed.bind(this);
    this.onGameStateChanged = this.onGameStateChanged.bind(this);
    // my
    this.onPressedLeftControl = this.onPressedLeftControl.bind(this);
    this.onPressedRightControl = this.onPressedRightControl.bind(this);
    // this._pressed = this._pressed.bind(this);
    // -//-
    this.controllersLoopIntervalId = null;
  }

  start() {
    gameBus.on('game_start', this.onGameStarted);
    gameBus.on('game_finish', this.onGameFinished);
    gameBus.on('controls_pressed', this.onControllsPressed);
    gameBus.on('state_changed', this.onGameStateChanged);

    gameBus.on('left_pressed', this.onPressedLeftControl);
    gameBus.on('right_pressed', this.onPressedRightControl);

    const { controller } = this;
    this.controllersLoopIntervalId = setInterval(() => {
      // const actions = controller.diff(); // Получаем предыдущую нажатую кнопку
      // console.log("Action: ", actions);
      /* if (Object.keys(actions).some(k => actions[k]))
           gameBus.emit(events.CONTROLS_PRESSED, actions);
      } */
      const actions = controller.costumeControl();
      if (actions.arrowleft === true) {
        // console.log('Action:', actions.arrowleft);
        gameBus.trigger('left_pressed', actions);
      } else {
        gameBus.trigger('right_pressed', actions);
      }
    }, 10);
  }

  destroy() {
    clearInterval(this.controllersLoopIntervalId);
    gameBus.off('game_start', this.onGameStarted);
    gameBus.off('game_finish', this.onGameFinished);
    gameBus.off('controls_pressed', this.onControllsPressed);
    gameBus.off('state_changed', this.onGameStateChanged);
    
    gameBus.off('left_pressed', this.onPressedLeftControl);
    gameBus.off('right_pressed', this.onPressedRightControl);
    
    if (this.gameloopRequestId) {
      window.cancelAnimationFrame(this.gameloopRequestId);
      this.gameloopRequestId = null;
    }
    // this.physics.destroy();
    this.controller.destroy();
    this.scene.destroy();
  }

  /* Зачем это?
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
*/

  // eslint-disable-next-line class-methods-use-this
  pressed(name, data) {
    return KEYS[name].some(k => data[k.toLowerCase()]); // Проверяет была ли нажата кнопка из KEYS
  }
}
