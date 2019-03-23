import {EVENTS} from '../modules/eventbus.js';
import Auth from './modules/auth.js';

export default class MenuModel extends BaseModel {
	constructor(eventBus) {
		this._eventBus = eventBus;
		this._eventBus.subscribe(AUTH_CHECK, this.__checkAuth.bind(this));
	}

	_checkAuth() {
		Auth.check()
			.then(result => {
				this._eventBus.trigger(AUTH_OK)
			})
	}
}