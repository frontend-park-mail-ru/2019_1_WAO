import Api from '../modules/api.js';
import {makeSafeList} from '../utils/safe.js';
import {isCorrectNickname, isCorrectEmail, isCorrectPassword} from '../utils/validation.js';

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
		  const password1 = form.elements.password.value;
		  const password2 = form.elements.password_repeat.value;

		  const body = {
		  	nickname,
		  	email,
		  	password1,
		  };		  
      
	      if (!this.checkValidation(nickname, email, password1, password2)) {
	        return;
	      }    

	      if (!this.checkXSS(body)) {
	        return;
	      }

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

  checkValidation(nickname, email, password1, password2) {
    let errList = [];
    isCorrectNickname(nickname, errList);
    isCorrectEmail(email, errList);
    isCorrectPassword(password1, password2, errList);

    if (errList.length > 0) {
      alert(errList);
      return false;
    }
    return true;
  }

  checkXSS(body) {
    if (!(makeSafeList(body))) {
      alert('Попытка XSS атаки');
      return false;
    }
    return true;
  }
}
