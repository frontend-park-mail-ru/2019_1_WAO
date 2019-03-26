import Auth from '../modules/auth.js';

export default class ProfileModel {
	constructor(eventBus) {
		this._eventBus = eventBus;
		this._eventBus.on("view_show", () => {
			this._checkAuth();
		});
	}

	_checkAuth() {		
		Api.getAuth()
			.then((res) => {
				if (res.status == 200 || res.status == 304) {
					console.log("authorized");
				} else {
					this._eventBus.trigger("auth_bad");
				}
			})
			.catch((err) => {	
				console.log(err);
				this._eventBus.trigger("auth_bad");
			});
	}

}