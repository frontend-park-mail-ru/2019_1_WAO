export const EVENTS = [
  'auth_check',
  'auth_ok',
  'auth_bad',
  'signin_ok',
  'signin_bad',
  'signup_ok',
  'signup_bad',
  'users_rx',
  'view_show',
  'view_hide',
  'users_req',
  'update_ok',
  'update_bad',
];

/**
 * EventBus module
 *@class EventBus
 */
export default class EventBus {
  constructor(eventsList = EVENTS) {
    this.events = {};
    eventsList.forEach((event) => {
      this.events[event] = [];
    });
  }

  /**
     * Подписаться на событие
     * @param {string} event
     * @param {function} callback
     * */
  on(event, callback) {
    if (!Object.prototype.hasOwnProperty.call(this.events, event)) {
      throw new Error(event);
    }

    this.events[event].push(callback);
  }

  /**
     * Отписка
     * @param {string} event
     * @param {function} callback
     * */
  off(event, callback) {
    if (!Object.prototype.hasOwnProperty.call(this.events, event)) {
      throw new Error(event);
    }

    this.events[event] = this.events[event].filter(deleted => deleted !== callback);
  }

  /**
     * Срабатывание на событие
     * @param {string} event
     * @param {Array} params
     * */
  trigger(event, ...pagams) {
    if (!Object.prototype.hasOwnProperty.call(this.events, event)) {
      throw new Error(event);
    }

    this.events[event].forEach((callback) => {
      callback(...pagams);
    });
  }
}
