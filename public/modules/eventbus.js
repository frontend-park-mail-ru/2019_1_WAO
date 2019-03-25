export const EVENTS = [
	"auth_check",
	"auth_ok",
	"auth_bad",
	"signin_ok",
	"signin_bad",
	"signup_ok",
	"signup_bad",
	"users_rx"
];

/**
 * EventBus module
 *@class EventBus
 */
export default class EventBus {

	constructor(eventsList = EVENTS) {
		this._events = {};
		eventsList.forEach(event => {
			this._events[event] = [];
		});
	}

    /**
     * Подписаться на событие
     * @param {string} event
     * @param {function} callback
     * */
	on(event, callback) {
		if (!this._events.hasOwnProperty(event)) {
			throw new Error(event);
		}

		this._events[event].push(callback)
	}

    /**
     * Отписка
     * @param {string} event
     * @param {function} callback
     * */
	off(event, callback) {
		if (!this._events.hasOwnProperty(event)) {
			throw new Error(event);
		}

		this._events[event] = this._events[event].filter(deleted => deleted !== callback) // hope it works
	}

    /**
     * Срабатывание на событие
     * @param {string} event
     * @param {Array} params
     * */
	trigger(event, ...pagams) {
		if (!this._events.hasOwnProperty(event)) {
			throw new Error(event);
		}

		this._events[event].forEach(callback => {
			callback(...pagams);
		});
	}
}