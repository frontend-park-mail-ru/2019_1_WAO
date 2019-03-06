'use strict';

import {createNavbar} from './pages/navbar/navbar.js';
import {createMenu} from './pages/menu/menu.js';
import {createScoreBoard} from './pages/scoreboard/scoreboard.js';
import {createRules} from './pages/rules/rules.js';

import {renderRegistrationPage, renderLoginPage, renderProfilePage} from "./display_pages.js"

const application = document.getElementById('application');

function ajax (callback, method, path, body) {
	const xhr = new XMLHttpRequest();
	xhr.open(method, path, true);
	xhr.withCredentials = true;

	if (body) {
		xhr.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
	}

	xhr.onreadystatechange = function () {
		if (xhr.readyState !== 4) {
			return;
		}
		callback(xhr);
	};

	if (body) {
		xhr.send(JSON.stringify(body));
	} else {
		xhr.send();
	}
}

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
