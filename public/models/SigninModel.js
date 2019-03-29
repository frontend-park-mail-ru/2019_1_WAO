import User from '../modules/user.js';
import Api from '../modules/api.js';
import {makeSafeList} from '../utils/safe.js';
import {isCorrectNickname, isCorrectPassword} from '../utils/validation.js';

export default class SignInModel {
  constructor(eventBus) {
    this._eventBus = eventBus;
    this._eventBus.on('view_show', () => {
      this._checkAuth();
    });
  }

  _checkAuth() {
    Api.getAuth()
      .then((res) => {
        if (res.status == 200 || res.status == 304) {
          console.log('authorized');
          this._eventBus.trigger('auth_ok');
        } else {
          this._makeSignin();
        }
      })
      .catch((err) => {
        console.log(err);
        this._eventBus.trigger('auth_bad');
      });
  }

  _makeSignin() {
    const form = document.querySelector('form');
    form.addEventListener('submit', (event) => {
		  event.preventDefault();
		  const nickname = form.elements.nickname.value;
		  const password = form.elements.password.value;
		  const body = {
		  	nickname,
		  	password,
		  };
      
      
      if (!this.checkValidation(nickname, password)) {
        return;
      }    

      if (!this.checkXSS(body)) {
        return;
      }

		  Api.postSignIn(body)
		  	.then((res) => {
		  		if (res.status == 200 || res.status == 304) {
		        	// User.update();
		        	this._eventBus.trigger('signin_ok');
		        	return Api.getAuth();
		  		}
		        	this._eventBus.trigger('signin_bad');
		  	})
		  	.then((res) => {
		  		if (res.status == 200 || res.status == 304) {
		  			res.json().then((user) => {
		  				User.set(user);
		  			});
		  		}
		  	})
        .catch((err) => {
          console.log(err);
          this._eventBus.trigger('auth_bad');
        });
    });
  }

  checkValidation(nickname, password) {
    let errList = [];
    isCorrectNickname(nickname, errList);
    isCorrectPassword(password, password, errList);

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
