'use strict';

import './img/user.png';

import './components/Signin/login.css';
import './components/Menu/Menu.css';
import './components/Navbar/Navbar.css';
import './components/Profile/profile.css';
import './components/Registration/registration.css';
import './components/Rules/Rules.css';
import './components/ScoreBoard/scoreboard.css';

import * as Add_router from './routers_functions.js';

const application = document.getElementById('application');

const pages = {
  'menu': Add_router.createNavbarMenu,
  'scoreboard': Add_router.createNavbarScoreBoard,
  'rules': Add_router.createNavbarRules,
  'profile': Add_router.createNavbarProfile,
  'signin': Add_router.createLoginPage,
  'signup': Add_router.createRegistrationPage,
};

Add_router.createLoginPage();
// Add_router.createNavbarMenu();

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

