import Api from '../modules/api.js';

export default class ScoreBoardModel {
	constructor(eventBus) {
		this._eventBus = eventBus;
		this._eventBus.on("view_show", () => {
			this._checkAuth();
		});
		/*
		this._eventBus.on("users_req", () => {
			this._getUsers();
		});
		*/
	}

	_checkAuth() {		
		Api.getAuth()
			.then((res) => {
				if (res.status == 200 || res.status == 304) {
					console.log("authorized");
					return Api.getScoreBoard(1);
				} else {
					this._eventBus.trigger("auth_bad");
				}
			})
			.then((res) => {
				if (res.status == 200 || res.status == 304) {
					res.json().then((users) => {
						this._eventBus.trigger('users_rx', users);
				});
				} else {
					console.log("not get users");
					this._eventBus.trigger("auth_bad");
				}			
			})
			.catch((err) => {	
				console.log(err);
				this._eventBus.trigger("auth_bad");
			});
	}

}