'use strict';

import './pages/login/login.css';
import './pages/menu/menu.css';
import './pages/navbar/navbar.css';
import './pages/profile/profile.css';
import './pages/registration/registration.css';
import './pages/rules/rules.css';
import './pages/scoreboard/scoreboard.css';

import AjaxModule from './modules/ajax.js';
import * as Add_router from './routers_functions.js'

const application = document.getElementById('application');

const pages = {
	"menu": 		Add_router.createNavbarMenu,
	"scoreboard": 	Add_router.createNavbarScoreBoard,	
	"rules": 		Add_router.createNavbarRules,
	"profile": 		Add_router.createNavbarProfile,
	"signin": 		Add_router.createLoginPage,
	"signup": 		Add_router.createRegistrationPage
}

Add_router.createNavbarMenu();

application.addEventListener('click', function(event) {
	if (!(event.target instanceof HTMLAnchorElement)) {
		return;
	}
	event.preventDefault();
	const link = event.target;

	console.log({
		href: link.href,
		dataHref: link.dataset.href		
	});

	if (pages.hasOwnProperty(link.dataset.href)) {
		application.innerHTML = '';
		pages[link.dataset.href]();
	}

});
