import Auth from '../modules/auth.js';

export default class ScoreBoardModel {
	constructor(eventBus) {
		this._eventBus = eventBus;
		this._eventBus.on("view_show", () => {
			this._checkAuth();
		});
		this._eventBus.on("users_req", () => {
			this._getUsers();
		});
	}

	_checkAuth() {		
		Auth.check()
			.then(result => {
				console.log("authorized");
				//this._eventBus.trigger("auth_ok");	
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