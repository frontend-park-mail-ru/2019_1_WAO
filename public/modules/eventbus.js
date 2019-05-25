/**
 * Список событий
 */

export const EVENTS = [
  'call',
  'data_req',
  'ready',
  'render',
  'show',
  'hide',
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
  'chat_show',
  'user_show',
  'view_rend',
  'users_req',
  'update_ok',
  'update_bad',
  'valid_err',
  'reset',
  'url_change',
  'chat_rx',
  'game_score',
  'to_offline',
  'to_online',
  'gap_changed',
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
    this.events = new Map();
    eventsList.forEach((event) => {
      this.events.set(event, []);
    });
  }

  /**
     * Подписаться на событие
     * @param {string} event Имя события
     * @param {function} callback Колбэк на это событие
     * */
  on(event, callback) {
    if (!this.events.has(event)) {
      console.log(`add ${event}`);
      this.events.set(event);
    }

    this.events.get(event).push(callback);
  }

  /**
     * Отписка
     * @param {string} event Имя события
     * @param {function} callback Колбэк на это событие
     * */
  off(event, callback) {
    if (!this.events.has(event)) {
      console.log(`${event} is not exist`);
      return;
    }

    // Удаляем конкретный колбэк из списка колбэков для данного события
    this.events.set(event, this.events.get(event).filter(deleted => deleted !== callback));
  }

  /**
     * Срабатывание на событие
     * @param {string} event Имя события
     * @param {Array} params Параметры, передаваемые в колбэк
     * */
  trigger(event, ...params) {
    if (!this.events.has(event)) {
      throw new Error(event);
    }

    this.events.get(event).forEach((callback) => {
      callback(...params);
    });
  }
}

const GlobalBus = new EventBus(EVENTS);
const gameBus = new EventBus(GAME_EVENTS);
export { EventBus, GlobalBus, gameBus };
