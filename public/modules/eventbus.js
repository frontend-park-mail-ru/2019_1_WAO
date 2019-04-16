/**
 * Список событий
 */

export const EVENTS = [
  'call',
  'data_req',
  'ready',
  'render',
  'show',
  'auth_check',
  'auth_ok',
  'auth_bad',
  'auth_out',
  'signin_ok',
  'signin_bad',
  'signup_ok',
  'signup_bad',
  'users_rx',
  'view_show',
  'view_hide',
  'user_show',
  'view_rend',
  'users_req',
  'update_ok',
  'update_bad',
  'valid_err',
  'reset',
  'url_change',
];

const GAME_EVENTS = [
  'game_start',
  'game_finish',
  'game_close',
  'controls_pressed',
  'state_changed',
  'left_pressed',
  'right_pressed',
  'fire_pressed',
];

/**
 * Модуль шины событий
 * @class EventBus
 */
class EventBus {
  constructor(eventsList = EVENTS) {
    this.events = {};
    eventsList.forEach((event) => {
      this.events[event] = [];
    });
  }

  /**
     * Подписаться на событие
     * @param {string} event Имя события
     * @param {function} callback Колбэк на это событие
     * */
  on(event, callback) {
    if (!Object.prototype.hasOwnProperty.call(this.events, event)) {
      throw new Error(event);
    }

    this.events[event].push(callback);
  }

  /**
     * Отписка
     * @param {string} event Имя события
     * @param {function} callback Колбэк на это событие
     * */
  off(event, callback) {
    if (!Object.prototype.hasOwnProperty.call(this.events, event)) {
      throw new Error(event);
    }

    this.events[event] = this.events[event].filter(deleted => deleted !== callback);
  }

  /**
     * Срабатывание на событие
     * @param {string} event Имя события
     * @param {Array} params Параметры, передаваемые в колбэк
     * */
  trigger(event, ...params) {
    if (!Object.prototype.hasOwnProperty.call(this.events, event)) {
      throw new Error(event);
    }

    this.events[event].forEach((callback) => {
      callback(...params);
    });
  }
}

const GlobalBus = new EventBus(EVENTS);
const gameBus = new EventBus(GAME_EVENTS);
export { EventBus, GlobalBus, gameBus };
