import Router from './modules/router';
import { GlobalBus } from './modules/eventbus';
import { delAuth, checkStatus } from './modules/api';

import MenuPresenter from './presenters/MenuPresenter';
import ScoreBoardPresenter from './presenters/ScoreBoardPresenter';
import ProfilePresenter from './presenters/ProfilePresenter';
import SignInPresenter from './presenters/SigninPresenter';
import SignUpPresenter from './presenters/SignupPresenter';
import AboutPresenter from './presenters/AboutPresenter';
import StorePresenter from './presenters/StorePresenter';
import GamePresenter from './presenters/GamePresenter';
import OnlineGamePresenter from './presenters/OnlineGamePresenter';
import PresentationPresenter from './presenters/PresentationPresenter';

import './img/user.png';
import './img/door.svg';
import './img/menu.png';

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
 * Подписка на события глобальной шины
 */
function subscribeGlobalBus() {
  GlobalBus.on('auth_bad', () => {
    Router.route('/signin');
  });

  GlobalBus.on('auth_out', () => {
    console.log('Try to out');
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

/**
 * Точка входа
 */
function start() {
  registerSW();
  console.log('Start');

  const application = document.getElementById('application');
  Router.setRoot(application);
  Router.add('/',         new MenuPresenter());
  Router.add('/users',    new ScoreBoardPresenter());
  Router.add('/profile',  new ProfilePresenter());
  Router.add('/signin',   new SignInPresenter());
  Router.add('/signup',   new SignUpPresenter());
  Router.add('/about',    new AboutPresenter());
  Router.add('/store',    new StorePresenter());
  Router.add('/gameoffline', new GamePresenter());
  Router.add('/gameonline',  new OnlineGamePresenter());
  Router.add('/show',  new PresentationPresenter());

  subscribeGlobalBus();

  Router.route(window.location.pathname);
  Router.listen();
}

/**
 * На самом деле это точка входа
 */
document.addEventListener('DOMContentLoaded', start());
