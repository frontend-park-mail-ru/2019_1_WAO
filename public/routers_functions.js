import AjaxModule from './modules/ajax.js';

import {renderLoginPage} from './pages/login/login.js';
import {renderProfilePage} from './pages/profile/profile.js';
import {renderRegistrationPage} from './pages/registration/registration.js';

import {NavbarComponent} from './components/Navbar/Navbar.js';
import {MenuComponent} from './components/Menu/Menu.js';
import {RulesComponent} from './components/Rules/Rules.js';
import {Signin} from './components/Signin/signin.js';
import {Registration} from './components/Registration/registration.js';
import {Profile} from './components/Profile/profile.js';
import {ScoreBoardComponent} from './components/ScoreBoard/ScoreBoard.js';
import {ScoreProfileComponent} from './components/ScoreProfile/ScoreProfile.js';

import {RENDER_TYPES} from './utils/constants.js';


function createNavbar() {
	const navbarSection = document.createElement('section');
	navbarSection.dataset.sectionName = 'navbar';	

	const navbar = new NavbarComponent({
		el: navbarSection,
		type: RENDER_TYPES.TMPL,
	})
	navbar.render();
	application.appendChild(navbarSection);
}

export function createNavbarMenu() {
	createNavbar();

	const menuSection = document.createElement('section');
	menuSection.dataset.sectionName = 'menu';

	const menu = new MenuComponent({
		el: menuSection,
		type: RENDER_TYPES.TMPL,
	})
	menu.render();
	application.appendChild(menuSection);
}

function createScoreProfile(element, user) {
	if (user) {
		const scoreprofile = new ScoreProfileComponent({		
			el: element,
			type: RENDER_TYPES.TMPL,
		});			
		scoreprofile.data = JSON.parse(JSON.stringify(user));
		scoreprofile.render();	
	} else {
		AjaxModule.doGet({
			callback(xhr) {
				if (!xhr.responseText) {
					console.log('Unauthorized');
					element.add("scoreboard_score_data");
					//element.innerHTML = 'Че не авторизовался';
					//createMenu();
					return;
				}
				const user = JSON.parse(xhr.responseText);
				element.innerHTML = '';
				createScoreProfile(element, user);
			},
			path: '/me',
		});
	}
}

export function createNavbarScoreBoard(users) {
	createNavbar();

	const scoreBoardSection = document.createElement('section');
	scoreBoardSection.dataset.sectionName = 'scoreboard';
	const container = document.createElement('div');

	createScoreProfile(container);
	container.classList.add("scoreboard_container");
	scoreBoardSection.appendChild(container);

	if (users) {
		const scoreboard = new ScoreBoardComponent({
			el: container,
			type: RENDER_TYPES.TMPL,
		});
		scoreboard.data = JSON.parse(JSON.stringify(users));
		scoreboard.render();
	} else {
		const em = document.createElement('em');
		em.textContent = 'Loading';
		container.appendChild(em);

		AjaxModule.doGet({
			callback(xhr) {
				const users = JSON.parse(xhr.responseText);
				application.innerHTML = '';
				createNavbarScoreBoard(users);
			},
			path: '/users',
		});
	}

	application.appendChild(scoreBoardSection);
}

export function createNavbarRules() {
	createNavbar();
	
	const rulesSection = document.createElement('section');
	rulesSection.dataset.sectionName = 'rules';

	const rules = new RulesComponent({
		el: rulesSection,
		type: RENDER_TYPES.TMPL,
	})
	rules.render();
	application.appendChild(rulesSection);
}

export function createNavbarProfile(me) {
<<<<<<< HEAD
	createNavbar();

	renderProfilePage(AjaxModule, me);	
=======
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
>>>>>>> exp_Howle3
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