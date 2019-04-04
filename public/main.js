import Router from './modules/router';
import { GlobalBus } from './modules/eventbus';
import { delAuth, checkStatus } from './modules/api';

import MenuPresenter from './presenters/MenuPresenter';
import RulesPresenter from './presenters/RulesPresenter';
import ScoreBoardPresenter from './presenters/ScoreBoardPresenter';
import ProfilePresenter from './presenters/ProfilePresenter';
import SignInPresenter from './presenters/SigninPresenter';
import SignUpPresenter from './presenters/SignupPresenter';

import './img/user.png';
import './components/signin/login.css';
import './components/menu/Menu.css';
import './components/navbar/Navbar.css';
import './components/profile/profile.css';
import './components/signup/signup.css';
import './components/rules/Rules.css';
import './components/scoreboard/ScoreBoard.css';

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
  // registerSW(); // SW мешает запросы отслеживать на этапе отладки
  console.log('Start');

  const application = document.getElementById('application');
  Router.setRoot(application);
  Router.add('/',         new MenuPresenter());
  Router.add('/rules',    new RulesPresenter());
  Router.add('/users',    new ScoreBoardPresenter());
  Router.add('/profile',  new ProfilePresenter());
  Router.add('/signin',   new SignInPresenter());
  Router.add('/signup',   new SignUpPresenter());

  subscribeGlobalBus();

  Router.route(window.location.pathname);
  Router.listen();
}

/**
 * На самом деле это точка входа
 */
document.addEventListener('DOMContentLoaded', start());

/**
 * Пописака на события глобальной шины
 */
function subscribeGlobalBus() {
  GlobalBus.on('auth_bad', () => {
    Router.route('/signin');
  });

  GlobalBus.on('auth_out', () => {  
    delAuth()
      .then(checkStatus)
      .then(() => {
        Router.route('/signin');
      })
      .catch((err) => {
        console.log(err);
      }); 
  });
}
