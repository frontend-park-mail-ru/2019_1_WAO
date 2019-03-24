import Auth from '../modules/auth.js';

export default class ScoreBoardModel {
	constructor(eventBus) {
		this._eventBus = eventBus;
		this._eventBus.on("auth_check", this._checkAuth.bind(this));
	}

	_checkAuth() {		
	/*
		Auth.check()
			.then(result => {
				this._eventBus.trigger(AUTH_OK)
			})
	*/
	}
}