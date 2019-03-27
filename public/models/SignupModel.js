import Api from '../modules/api.js';

export default class SignUpModel {
  constructor(eventBus) {
    this._eventBus = eventBus;
    this._eventBus.on('view_show', () => {
      this._makeSignUp();
    });
  }

  _makeSignUp() {
    const form = document.querySelector('form');
    // form.addEventListener('submit', event => {
  		const footer = document.getElementsByClassName('registration_input_footer_divblock_registration')[0];
  		footer.addEventListener('click', (event) => {
		  event.preventDefault();
		  const nickname = form.elements.nickname.value;
		  const email = form.elements.email.value;
		  const password = form.elements.password.value;
		  const body = {
		  	nickname,
		  	email,
		  	password,
		  };
		  Api.postSignUp(body)
		  	.then((res) => {
		  		if (res.status == 200 || res.status == 304) {
		        	this._eventBus.trigger('signup_ok');
		        	// return Api.getAuth();
		  		} else {
		        	this._eventBus.trigger('signup_bad');
		  		}
		  	}) /*
		  	.then((res) => {
		  		if (res.status == 200 || res.status == 304) {
		  			res.json().then((user) => {
		  				User.set(user);
		  			});
		  		}
		  	}) */
        .catch((err) => {
          console.log(err);
          this._eventBus.trigger('auth_bad');
        });
    });
  }
}
