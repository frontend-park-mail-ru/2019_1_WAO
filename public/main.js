'use strict';

import Router from './modules/router.js';
import EventBus from './modules/eventbus.js';

import MenuPresenter from './presenters/MenuPresenter.js';
import RulesPresenter from './presenters/RulesPresenter.js';
import ScoreBoardPresenter from './presenters/ScoreBoardPresenter.js';
import ProfilePresenter from './presenters/ProfilePresenter.js';
import SignInPresenter from './presenters/SignInPresenter.js';
import SignUpPresenter from './presenters/SignUpPresenter.js';

import './img/user.png';
import './components/Signin/login.css';
import './components/Menu/Menu.css';
import './components/Navbar/Navbar.css';
import './components/Profile/profile.css';
import './components/Registration/registration.css';
import './components/Rules/Rules.css';
import './components/ScoreBoard/ScoreBoard.css';

import * as Add_router from './routers_functions.js';

function start() {
  const eventBus = new EventBus();

  const application = document.getElementById('application');
  Router.setRoot(application);
  Router.add('/',         new MenuPresenter(eventBus));
  Router.add('/rules',    new RulesPresenter(eventBus));
  Router.add('/users',    new ScoreBoardPresenter(eventBus));
  Router.add('/profile',  new ProfilePresenter(eventBus));
  Router.add('/signin',   new SignInPresenter(eventBus));
  Router.add('/signup',   new SignUpPresenter(eventBus));

  Router.route('/');
  Router.listen();
}

document.addEventListener('DOMContentLoaded', () => {
  start();
});