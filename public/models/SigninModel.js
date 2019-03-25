import Auth from '../modules/auth.js';
import Ajax from '../modules/ajax.js';
import User from '../modules/user.js';

export default class SignInModel {
	constructor(eventBus) {
		this._eventBus = eventBus;
		//this._eventBus.on("auth_check", this._checkAuth.bind(this));
		this._checkAuth();
	}

	_checkAuth() {		
		Auth.check()
			.then(result => {
				console.log("authorized");
				this._eventBus.trigger("auth_ok");	
			})
			.catch(result => {
				this._makeSignin();
			});
	}

	_makeSignin() {
		const form = document.querySelector('form');
		form.addEventListener('submit', function(event) {
		  event.preventDefault();
		  const nickname = form.elements['nickname'].value;
		  const password = form.elements['password'].value;
		  Ajax.doPost({
		    callback: (xhr) => {
		      if (xhr.status === 200) {
		        User.update();
		        this._eventBus.trigger("signin_ok");
		      } else {
		        this._eventBus.trigger("signin_bad");
		      }
		    },
		    path: '/signin',
		    body: {
		      nickname,
		      password,
		    },
		  });
		});	
	}
}