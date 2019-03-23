'use strict';

import MenuView from './views/menu/MenuView.js';
import BaseView from './views/view/BaseView.js';
import Router from './modules/router.js';
//import {EventBus, EVENTS} from './modules/eventbus.js';
import EventBus from './modules/eventbus.js';
//import eventBus from './modules/eventbus.js';

import './img/user.png';
import './components/Signin/login.css';
import './components/Menu/Menu.css';
import './components/Navbar/Navbar.css';
import './components/Profile/profile.css';
import './components/Registration/registration.css';
import './components/Rules/Rules.css';
import './components/ScoreBoard/ScoreBoard.css';

import * as Add_router from './routers_functions.js';

document.addEventListener('DOMContentLoaded', () => {
  const eventBus = new EventBus();

  const application = document.getElementById('application');
  Router.setRoot(application);
  const menu = new MenuView(application, eventBus);
  Router.addView('/', menu);
  Router.route('/');
});

//const eventBus = new EventBus(EVENTS);

const pages = {
  'menu': Add_router.createNavbarMenu,
  'scoreboard': Add_router.createNavbarScoreBoard,
  'rules': Add_router.createNavbarRules,
  'profile': Add_router.createNavbarProfile,
  'signin': Add_router.createLoginPage,
  'signup': Add_router.createRegistrationPage,
};

//Add_router.createLoginPage();
const application = document.getElementById('application');
application.addEventListener('click', function(event) {
  if (!(event.target instanceof HTMLAnchorElement)) {
    return;
  }
  event.preventDefault();
  const link = event.target;

  console.log({
    href: link.href,
    dataHref: link.dataset.href,
  });

  if (pages.hasOwnProperty(link.dataset.href)) {
    application.innerHTML = '';
    pages[link.dataset.href]();
  }
});
