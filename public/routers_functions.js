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
import {Signin} from './components/Signin/signin.js';
import {Registration} from './components/Registration/registration.js';
import {Profile} from './components/Profile/profile.js';
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
	// createNavbar();
	// renderProfilePage(AjaxModule, me);

	const signin = new Profile({
		el: application,
		type: RENDER_TYPES.TMPL,
	})
	// let listDivs = [{}];
	if (me) {
        // listDivs = [
        //     {left: "Никнейм", right: me.nick},
        //     {left: "Email", right: me.email},
        //     {left: "Очки", right: me.score},
        //     {left: "KDA", right: me.kda},
		// ];
		signin.data = {
			nick: me.nick,
			email: me.email,
			score: me.score,
			kda: me.kda
		};
    } else {
		AjaxModule.doGet({
			callback(xhr) {
				if (!xhr.responseText) {
                    console.log('Unauthorized');
					//alert('Unauthorized');
					application.innerHTML = '';
					createNavbarProfile(AjaxModule);
					return;
				}
				console.log("Sent");
				const user = JSON.parse(xhr.responseText);
                application.innerHTML = '';
                createNavbarProfile(user);
				// renderProfilePage(user);
			},
			path: '/me',
		});
		console.log("END ajax");
	}
	signin.render();
}
export function createLoginPage() {
	// renderLoginPage(AjaxModule);

	const signin = new Signin({
		el: application,
		type: RENDER_TYPES.TMPL,
	})
	signin.render();
	let form = document.getElementsByTagName('form')[0];
	form.addEventListener("submit", function (event) {
		event.preventDefault();
		const email = form.elements[ 'email' ].value;
		const password = form.elements[ 'password' ].value;
		AjaxModule.doPost({
			callback() {
				application.innerHTML = '';
				createNavbarProfile();
			},
			path: '/login',
			body: {
				email,
				password,
			},
		});
	});

}
export function createRegistrationPage() {
	// renderRegistrationPage(AjaxModule);

	const signin = new Registration({
		el: application,
		type: RENDER_TYPES.TMPL,
	})
	signin.render();
	const form = document.getElementsByTagName('form')[0];
	const footer = document.getElementsByClassName('registration_input_footer_divblock_registration')[0];
	footer.addEventListener('click', function (event) {
		event.preventDefault();

        const nick = form.elements[ 'nick' ].value;
		const email = form.elements[ 'email' ].value;
		const password = form.elements[ 'password' ].value;
		const password_repeat = form.elements[ 'password_repeat' ].value;

		if (password !== password_repeat) {
			alert('Passwords is not equals');
			return;
		}

		AjaxModule.doPost({
			callback() {
                application.innerHTML = '';
                createNavbarProfile();
				// renderProfilePage();
			},
			path: '/signup',
			body: {
                nick,
				email,
				password,
			},
		});
	});
}