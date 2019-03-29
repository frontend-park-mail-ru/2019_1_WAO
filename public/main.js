

import Router from './modules/router.js';
import EventBus from './modules/eventbus.js';

import MenuPresenter from './presenters/MenuPresenter.js';
import RulesPresenter from './presenters/RulesPresenter.js';
import ScoreBoardPresenter from './presenters/ScoreBoardPresenter.js';
import ProfilePresenter from './presenters/ProfilePresenter.js';
import SignInPresenter from './presenters/SignInPresenter.js';
import SignUpPresenter from './presenters/SignUpPresenter.js';
import ExamplePresenter from './example.js';

import './img/user.png';
import './components/Signin/login.css';
import './components/Menu/Menu.css';
import './components/Navbar/Navbar.css';
import './components/Profile/profile.css';
import './components/Registration/registration.css';
import './components/Rules/Rules.css';
import './components/ScoreBoard/ScoreBoard.css';

// import * as Add_router from './routers_functions.js';

/**
TO DO
session storage!!! (try catch)
local storage ?
* */
function registerSW() {
  if ('serviceWorker' in navigator && (window.location.protocol === 'https:' || window.location.hostname === '127.0.0.1')) {
    navigator.serviceWorker.register('/sw.js')
      .then(reg => console.log('SW success: ', reg))
      .catch(err => console.error('SW fail: ', err));
  }
}

function start() {
  registerSW();
  console.log('Start');
  const eventBus = new EventBus();

  const application = document.getElementById('application');
  Router.setRoot(application);
  // Router.add('/',         new ExamplePresenter(Router, eventBus));
  Router.add('/',         new MenuPresenter(Router, eventBus));
  Router.add('/rules',    new RulesPresenter(Router, eventBus));
  Router.add('/users',    new ScoreBoardPresenter(Router, eventBus));
  Router.add('/profile',  new ProfilePresenter(Router, eventBus));
  Router.add('/signin',   new SignInPresenter(Router, eventBus));
  Router.add('/signup',   new SignUpPresenter(Router, eventBus));

  //Router.route('/');
  Router.route(window.location.pathname);
  Router.listen();
}

document.addEventListener('DOMContentLoaded', () => {
  start();
});
