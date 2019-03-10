'use strict';

import './pages/login/login.css';
import './components/Menu/menu.css';
import './components/Navbar/navbar.css';
import './pages/profile/profile.css';
import './pages/registration/registration.css';
import './components/Rules/rules.css';
import './components/ScoreBoard/scoreboard.css';

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

Add_router.createLoginPage();
//Add_router.createNavbarMenu();

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
