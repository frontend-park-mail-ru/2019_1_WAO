'use strict';

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

const pages = {
	"menu": 		createNavbarMenu,
	"scoreboard": 	createNavbarScoreBoard,	
	"rules": 		createNavbarRules,
	"profile": 		createNavbarProfile,
	"signin": 		renderLoginPage,
	"signup": 		renderRegistrationPage
};

createNavbarMenu();

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
