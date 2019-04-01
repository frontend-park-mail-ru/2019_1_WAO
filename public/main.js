

import Router from './modules/router';
import EventBus from './modules/eventbus';

import MenuPresenter from './presenters/MenuPresenter';
import RulesPresenter from './presenters/RulesPresenter';
import ScoreBoardPresenter from './presenters/ScoreBoardPresenter';
import ProfilePresenter from './presenters/ProfilePresenter';
import SignInPresenter from './presenters/SigninPresenter';
import SignUpPresenter from './presenters/SignupPresenter';

import './img/user.png';
import './views/signin/login.css';
import './views/menu/Menu.css';
import './components/Navbar/Navbar.css';
import './views/profile/profile.css';
import './views/signup/signup.css';
import './views/rules/Rules.css';
import './views/scoreboard/ScoreBoard.css';

/**
TO DO
session storage!!!
local storage
* */

/**
 * Регистрация Service Worker
 */
function registerSW() {
  if ('serviceWorker' in navigator && (window.location.protocol === 'https:' || window.location.hostname === '127.0.0.1')) {
    navigator.serviceWorker.register('/sw.js')
      .then(reg => console.log('SW success: ', reg))
      .catch(err => console.error('SW fail: ', err));
  }
}

/**
 * Точка входа
 */
function start() {
  // registerSW();
  console.log('Start');
  const eventBus = new EventBus();

  const application = document.getElementById('application');
  Router.setRoot(application);
  Router.add('/',         new MenuPresenter(Router, eventBus));
  Router.add('/rules',    new RulesPresenter(Router, eventBus));
  Router.add('/users',    new ScoreBoardPresenter(Router, eventBus));
  Router.add('/profile',  new ProfilePresenter(Router, eventBus));
  Router.add('/signin',   new SignInPresenter(Router, eventBus));
  Router.add('/signup',   new SignUpPresenter(Router, eventBus));

  Router.route(window.location.pathname);
  Router.listen();
}

/**
 * На самом деле это точка входа
 */
document.addEventListener('DOMContentLoaded', () => {
  start();
});
