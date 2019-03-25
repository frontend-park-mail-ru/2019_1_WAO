import Auth from '../modules/auth.js';

export default class ProfileModel {
	constructor(eventBus) {
		this._eventBus = eventBus;
		this._eventBus.on("view_show", () => {
			this._checkAuth();
		});
	}

	_checkAuth() {		
		Auth.check()
			.then(result => {
				console.log("authorized");
			})
			.catch(result => {
				this._eventBus.trigger("auth_bad");	
			});
	}

}