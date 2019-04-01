import {
  getAuth, putProfile, checkStatus, parseJSON,
} from '../modules/api';
import User from '../modules/user';
import checkXSS from '../utils/safe';
import { checkValidationNEP } from '../utils/validation';

export default class ProfileModel {
  constructor(eventBus) {
    this.eventBus = eventBus;
    this.eventBus.on('view_show', () => {
      this.checkAuth();
    });
  }

  checkAuth() {
    getAuth()
      .then(checkStatus)
      .then(parseJSON)
      .then((data) => {
        console.log('profile auth ok');
        console.log(data);
        User.set(data);
        this.eventBus.trigger('users_rx', data);
        this.updateUser();
      })
      .catch(() => {
        console.log('profile auth bad');
        this.eventBus.trigger('auth_bad');
      });
  }

  updateUser() {
    const form = document.querySelector('form');
    const button = document.getElementsByClassName('profile_change_button')[0];
    button.addEventListener('click', (event) => {
      event.preventDefault();
      const nickname = form.elements.nickname.value;
      const email = form.elements.email.value;
      // const password = form.elements['password'].value;
      const password1 = 'kostyl'; // секретный ключ, не запоминать
      const password2 = 'kostyl';
      const image = document.getElementById('inputImg').files[0];

      if (!checkValidationNEP(nickname, email, password1, password2)) {
        return;
      }

      if (!checkXSS({ nickname, email, password1 })) {
        return;
      }

      const formData = new FormData();
      formData.append('nickname', nickname);
      formData.append('email', email);
      formData.append('password', password1);
      formData.append('image', image);

      putProfile(nickname, formData)
        .then(checkStatus)
        .catch(() => {
          console.log('update bad');
          this.eventBus.trigger('update_bad');
        });
    });
  }
}
