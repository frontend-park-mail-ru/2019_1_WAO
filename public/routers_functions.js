import AjaxModule from './modules/ajax.js';

import {createNavbar} from './pages/navbar/navbar.js';

import {createMenu} from './pages/menu/menu.js';
import {createScoreBoard} from './pages/scoreboard/scoreboard.js';
import {createRules} from './pages/rules/rules.js';

import {renderLoginPage} from './pages/login/login.js';
import {renderProfilePage} from './pages/profile/profile.js';
import {renderRegistrationPage} from './pages/registration/registration.js';


export function createNavbarMenu() {
	createNavbar();
	createMenu();	
}
export function createNavbarScoreBoard() {
	createNavbar();
	createScoreBoard();	
}
export function createNavbarRules() {
	createNavbar();
	createRules();	
}
export function createNavbarProfile(me) {
	createNavbar();
	renderProfilePage(AjaxModule, me);	
}
export function createLoginPage() {
	renderLoginPage(AjaxModule);
}
export function createRegistrationPage() {
	renderRegistrationPage(AjaxModule);
}