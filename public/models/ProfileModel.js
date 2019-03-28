import Api from '../modules/api.js';
import User from '../modules/user.js';
import {makeSafeList} from '../utils/safe.js';

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
	  button.addEventListener('click', function (event) {
	    event.preventDefault();
	    const nickname = form.elements.nickname.value;
	    const email = form.elements.email.value;
	    // const password = form.elements['password'].value;
	    const password = '222222';
	  	const image = document.getElementById('inputImg').files[0];
      
      if (!(makeSafeList({
        nickname,
        email,
        password
      }))) {
        alert('Попытка XSS атаки');
        return;
      }

	    const formData = new FormData();
	    formData.append('nickname', nickname);
	    formData.append('email', email);
	    formData.append('password', password);
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
}
