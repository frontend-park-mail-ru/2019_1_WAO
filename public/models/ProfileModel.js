import Auth from '../modules/auth.js';

export default class ProfileModel {
	constructor(eventBus) {
		this._eventBus = eventBus;
		//this._eventBus.on("auth_check", this._checkAuth.bind(this));
		this._checkAuth();
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