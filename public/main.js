'use strict';

import {MenuView} from './views/menu/MenuView.js';
import Router from './modules/router.js';
//import {EventBus, EVENTS} from './modules/eventbus.js';
import eventBus from './modules/eventbus.js';

import './img/user.png';
import './components/Signin/login.css';
import './components/Menu/Menu.css';
import './components/Navbar/Navbar.css';
import './components/Profile/profile.css';
import './components/Registration/registration.css';
import './components/Rules/Rules.css';
import './components/ScoreBoard/scoreboard.css';

import * as Add_router from './routers_functions.js';

//const eventBus = new EventBus(EVENTS);
//const eventBus = new EventBus();

const application = document.getElementById('application');
Router.setRoot(application);

Router.addView('/', new MenuView(application, eventBus));

const pages = {
  'menu': Add_router.createNavbarMenu,
  'scoreboard': Add_router.createNavbarScoreBoard,
  'rules': Add_router.createNavbarRules,
  'profile': Add_router.createNavbarProfile,
  'signin': Add_router.createLoginPage,
  'signup': Add_router.createRegistrationPage,
};

//Add_router.createLoginPage();

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
