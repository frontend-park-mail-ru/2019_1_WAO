import Api from '../modules/api.js';
import User from '../modules/user.js';
import {makeSafeList} from '../utils/safe.js';
import {isCorrectNickname, isCorrectEmail, isCorrectPassword} from '../utils/validation.js';

export default class ProfileModel {
  constructor(eventBus) {
    this._eventBus = eventBus;
    this._eventBus.on('view_show', () => {
      this._checkAuth();
    });
  }

  _checkAuth() {
    Api.getAuth()
      .then((res) => {
        if (res.status == 200 || res.status == 201 || res.status == 304) {
          res.json().then((user) => {
            User.set(user);
            this._eventBus.trigger('users_rx', user);
            this._updateUser();
          });
          // console.log("authorized");
          // this._eventBus.trigger('users_rx', User.get());
        } else {
          this._eventBus.trigger('auth_bad');
        }
      })
      .catch((err) => {
        console.log(err);
        this._eventBus.trigger('auth_bad');
      });
  }

  _updateUser() {
	  const form = document.getElementsByTagName('form')[0];
	  const button = document.getElementsByClassName('profile_change_button')[0];
	  button.addEventListener('click', event => {
	    event.preventDefault();
	    const nickname = form.elements.nickname.value;
	    const email = form.elements.email.value;
	    // const password = form.elements['password'].value;
	    const password1 = '222222';
      const password2 = '222222';
	  	const image = document.getElementById('inputImg').files[0];
      
      if (!this.checkValidation(nickname, email, password1, password2)) {
        return;
      }    

      if (!this.checkXSS({nickname, email, password1})) {
        return;
      }

	    const formData = new FormData();
	    formData.append('nickname', nickname);
	    formData.append('email', email);
	    formData.append('password', password1);
	    formData.append('image', image);

	    Api.putProfile(nickname, formData)
	    	.then((res) => {
	    		if (res.status == 200 || res.status == 201 || res.status == 304) {
	    			console.log('Нормас');
	    		} else {
	    			console.log('Не нормас');
	    		}
	    	})
        .catch((err) => {
          console.log(err);
          this._eventBus.trigger('update_bad');
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
