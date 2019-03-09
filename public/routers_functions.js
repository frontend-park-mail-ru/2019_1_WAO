import AjaxModule from './modules/ajax.js';

import {createNavbar} from './pages/navbar/navbar.js';

import {createMenu} from './pages/menu/menu.js';
import {createScoreBoard} from './pages/scoreboard/scoreboard.js';
import {createRules} from './pages/rules/rules.js';

import {renderLoginPage} from './pages/login/login.js';
import {renderProfilePage} from './pages/profile/profile.js';
import {renderRegistrationPage} from './pages/registration/registration.js';

import {MenuComponent} from './components/Menu/Menu.js';
import {RulesComponent} from './components/Rules/Rules.js';
import {ScoreBoardComponent} from './components/ScoreBoard/ScoreBoard.js';
import {RENDER_TYPES} from './utils/constants.js';

export function createNavbarMenu() {
	//createNavbar();
	//createMenu();
	const menuSection = document.createElement('section');
	menuSection.dataset.sectionName = 'menu';

	const menu = new MenuComponent({
		el: menuSection,
		type: RENDER_TYPES.TMPL,
	})
	// menu.data = ...
	menu.render();
	application.appendChild(menuSection);
}
export function createNavbarScoreBoard() {
	//createNavbar();
	//createScoreBoard();	
	const scoreBoardSection = document.createElement('section');
	scoreBoardSection.dataset.sectionName = 'scoreboard';

	const scoreboard = new ScoreBoardComponent({
		el: scoreBoardSection,
		type: RENDER_TYPES.TMPL,
	})
	scoreboard.data = [
		{
			nickname: "Goshan",
			score: "1000",
			fda: "2.4"
		},
		{
			nickname: "Pashok",
			score: "500",
			fda: "1.4"
		}
	];
	scoreboard.render();
	application.appendChild(scoreBoardSection);
}
export function createNavbarRules() {
	createNavbar();
	//createRules();	
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