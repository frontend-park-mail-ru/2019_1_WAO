'use strict';

import Auth from './modules/auth.js';
import Ajax from './modules/ajax.js';
import User from './modules/user.js';
import {NavbarComponent} from './components/Navbar/Navbar.js';
import {MenuComponent} from './components/Menu/Menu.js';
import {RulesComponent} from './components/Rules/Rules.js';
import {ScoreBoardComponent} from './components/ScoreBoard/ScoreBoard.js';
// import {ScoreProfileComponent} from './components/ScoreProfile/ScoreProfile.js';
import {Signin} from './components/Signin/signin.js';
import {Registration} from './components/Registration/registration.js';
import {Profile} from './components/Profile/profile.js';

import {RENDER_TYPES} from './utils/constants.js';

// ВСЕ ЭТО НАДО РАЗНЕСТИ ПО КЛАССАМ КОМПОНЕНТОВ

function createNavbar() {
  const navbar = new NavbarComponent();
  navbar.create();
}

export function createNavbarMenu() {
  const menu = new MenuComponent();
  menu.create();
}

export function createNavbarScoreBoard(users) {
  createNavbar();

  const scoreBoardSection = document.createElement('section');
  scoreBoardSection.dataset.sectionName = 'scoreboard';
  const container = document.createElement('div');
  container.classList.add('scoreboard_container');
  scoreBoardSection.appendChild(container);

  // createScoreProfile(container);
  if (users) {
    const scoreboard = new ScoreBoardComponent({
      el: container,
      type: RENDER_TYPES.TMPL,
    });
    scoreboard.data = JSON.parse(JSON.stringify(users));
    scoreboard.render();
  } else {
    const em = document.createElement('em');
    em.textContent = 'Loading';
    container.appendChild(em);

    Ajax.doGet({
      callback(xhr) {
        const users = JSON.parse(xhr.responseText);
        application.innerHTML = '';
        createNavbarScoreBoard(users);
      },
      path: '/users',
    });
  }

  application.appendChild(scoreBoardSection);
}

export function createNavbarRules() {
  createNavbar();

  const rulesSection = document.createElement('section');
  rulesSection.dataset.sectionName = 'rules';

  const rules = new RulesComponent({
    el: rulesSection,
    type: RENDER_TYPES.TMPL,
  });
  rules.render();
  application.appendChild(rulesSection);
}

export function createNavbarProfile(me) {
  createNavbar();
  const profileSection = document.createElement('section');
  profileSection.dataset.sectionName = 'profile';
  // renderProfilePage(Ajax, me);

  const signin = new Profile({
    el: profileSection,
    type: RENDER_TYPES.TMPL,
  });
  // let listDivs = [{}];
  if (me) {
    signin.data = JSON.parse(JSON.stringify(me));
  } else {
    Ajax.doGet({
      callback(xhr) {
        if (!xhr.responseText) {
          // alert('Unauthorized');
          application.innerHTML = '';
          createNavbarProfile(Ajax);
          return;
        }
        const user = JSON.parse(xhr.responseText);
        application.innerHTML = '';
        createNavbarProfile(user);
        // renderProfilePage(user);
      },
      path: '/users/' + User.nickname,
    });
  }
  signin.render();
  application.appendChild(profileSection);
  // Обработка изменений
  const form = document.getElementById('form');
  const button = document.getElementsByClassName('profile_change_button')[0];
  button.addEventListener('click', function(event) {
    event.preventDefault();
    const nickname = form.elements['nickname'].value;
    if ( nickname === me.nickname ) {
      console.log('Equal!', nickname);
    } else {
      Ajax.doPost({
        callback() {
          application.innerHTML = '';
          createNavbarProfile();
          console.log('Sent');
        },
        path: '/users/' + me.nickname,
        body: {
          nickname,
          password: me.password,
        },
      });
    }
  });

  const inputImg = document.getElementById('inputImg');
  const buttonImg = document.getElementById('buttonImg');
  buttonImg.addEventListener('click', function(event) {
    event.preventDefault();
    const formData = new FormData();
    formData.append('image', inputImg.files[0]);
    // const xhr = new XMLHttpRequest();
    // xhr.open('POST', '/api/v1/users/testuser/image', true);
    // xhr.withCredentials = true;
    // xhr.setRequestHeader("Content-Type", "multipart/form-data");
    // xhr.send(formData);

    Ajax.doPost({
      callback() {
        createNavbarProfile();
        console.log('Sent Img');
      },
      path: '/users/testuser/image',
      body: {
        image: inputImg.files[0],
      },
    });
  });
}

export function createLoginPage(me) {
  Auth.check()
      .then((result) => {
        createNavbarMenu();
      })
      .catch(() => {
        const signin = new Signin({
          el: application,
          type: RENDER_TYPES.TMPL,
        });
        signin.render();
        const form = document.getElementsByTagName('form')[0];
        form.addEventListener('submit', function(event) {
          event.preventDefault();
          const nickname = form.elements['nickname'].value;
          const password = form.elements['password'].value;
          Ajax.doPost({
            callback: (xhr) => {
              if (xhr.status === 200) {
                application.innerHTML = '';
                User.update();
                createNavbarMenu();
              } else {
                application.innerHTML = '';
                createLoginPage();
              }
            },
            path: '/signin',
            body: {
              nickname,
              password,
            },
          });
        });
      });
}

export function createRegistrationPage() {
  // renderRegistrationPage(Ajax);
  const signup = new Registration({
    el: application,
    type: RENDER_TYPES.TMPL,
  });
  signup.render();
  const form = document.querySelector('form');
  const footer = document.getElementsByClassName('registration_input_footer_divblock_registration')[0];
  footer.addEventListener('click', function(event, formdata) {
    const errList = [''];
    event.preventDefault();

    const nickname 			= form.elements['nickname'].value;
    const email 			= form.elements['email'].value;
    const password 			= form.elements['password'].value;
    const password_repeat 	= form.elements['password_repeat'].value;

    if (password !== password_repeat) {
      errList.push('Пароли не одинаковые!');
    }
    if (nickname.length < 4) {
      errList.push('Плохой ник!');
    }
    /*
		if (!email.match(/^([a-z0-9_\-]+\.)*[a-z0-9_\-]+@([a-z0-9][a-z0-9\-]*[a-z0-9]\.)+[a-z]{2,4}$/i)){
			errList.push("Неверно введена почта!");
		}
		*/
    if (password.length < 6) {
      errList.push('Пароль короче 6 символов!');
    }
    if (errList.length > 1) {
      const errBlock = document.getElementsByClassName('registration_err_list')[0];
      ShowErrMassage(errBlock, errList);
      return;
    }
    Ajax.doPost({
      callback() {
        application.innerHTML = '';
        // createNavbarProfile();
        createNavbarMenu();
        // renderProfilePage();
      },
      path: '/signup',
      body: {
        nickname,
        email,
        password,
      },
    });
  });
  function ShowErrMassage(errBlock, errList) {
    errBlock.innerHTML = '';
    errList.forEach((elm) => {
      console.log(elm, errList.length);
      errBlock.innerHTML += elm + '<br>';
    });
  }
}
