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
import OfflineGamePresenter from './presenters/OfflineGamePresenter';
import OnlineGamePresenter from './presenters/OnlineGamePresenter';
import PresentationPresenter from './presenters/PresentationPresenter';
import ChatPresenter from './presenters/ChatPresenter';

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
        Router.route('/');
        // Router.route('/signin');
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
  const common = document.createElement('div');
  common.classList.add('common');
  application.appendChild(common);
  const appEl = document.createElement('div');
  const userEl = document.createElement('div');
  // const chatEl = document.createElement('div');
  application.appendChild(appEl);
  application.appendChild(userEl);
  // application.appendChild(chatEl);

  Router.setRoot(application);
  Router.add('/',         new MenuPresenter([appEl, userEl]));
  Router.add('/users',    new ScoreBoardPresenter([appEl, userEl]));
  Router.add('/profile',  new ProfilePresenter([appEl, userEl]));
  Router.add('/signin',   new SignInPresenter([appEl]));
  Router.add('/signup',   new SignUpPresenter([appEl]));
  Router.add('/about',    new AboutPresenter([appEl, userEl]));
  Router.add('/store',    new StorePresenter([appEl, userEl]));
  Router.add('/gameoffline', new OfflineGamePresenter([appEl]));
  Router.add('/gameonline',  new OnlineGamePresenter([appEl]));
  Router.add('/show',  new PresentationPresenter([appEl]));
  Router.add('/chat',  new ChatPresenter(GlobalBus, appEl));

  subscribeGlobalBus();

  Router.route(window.location.pathname);
  Router.listen();
}

/**
 * На самом деле это точка входа
 */
document.addEventListener('DOMContentLoaded', start());
