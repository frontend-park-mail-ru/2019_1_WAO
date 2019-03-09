'use strict';

<<<<<<< HEAD
import './pages/login/login.css';
import './pages/menu/menu.css';
import './pages/navbar/navbar.css';
import './pages/profile/profile.css';
import './pages/registration/registration.css';
import './pages/rules/rules.css';
import './pages/scoreboard/scoreboard.css';

import {createNavbar} from './pages/navbar/navbar.js';
import {createMenu} from './pages/menu/menu.js';
import {createScoreBoard} from './pages/scoreboard/scoreboard.js';
import {createRules} from './pages/rules/rules.js';

import {renderRegistrationPage, renderLoginPage, renderProfilePage} from "./display_pages.js"


// К-К-К-КОСТЫЛЬ //

function createNavbarMenu() {
	createNavbar();
	createMenu();	
}

function createNavbarScoreBoard() {
	createNavbar();
	createScoreBoard();	
}

function createNavbarRules() {
	createNavbar();
	createRules();	
}

function createNavbarProfile() {
	createNavbar();
	renderProfilePage();	
}
///
=======
import AjaxModule from './modules/ajax.js';
import * as Add_router from './routers_functions.js'

const application = document.getElementById('application');
>>>>>>> exp_Howle_branch

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
