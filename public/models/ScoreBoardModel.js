import Auth from '../modules/auth.js';

export default class ScoreBoardModel {
	constructor(eventBus) {
		this._eventBus = eventBus;
		this._eventBus.on("auth_check", this._checkAuth.bind(this)); // при входе запустить надо _checkAuth!
		//this._checkAuth();
	}

	_checkAuth() {		
		Auth.check()
			.then(result => {
				console.log("authorized");
				this._getUsers();
			})
			.catch(result => {
				this._eventBus.trigger("auth_bad");	
			});
	}

	_getUsers() {
		Ajax.doGet({
			callback(xhr) {
				const users = JSON.parse(xhr.responseText);
				this._eventBus.trigger("users_rx", users);
			},
			path: '/users',
		});
	}

}