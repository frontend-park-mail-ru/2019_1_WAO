'use strict'

import AjaxModule from './modules/ajax.js';
import {NavbarComponent} from './components/Navbar/Navbar.js';
import {MenuComponent} from './components/Menu/Menu.js';
import {RulesComponent} from './components/Rules/Rules.js';
import {ScoreBoardComponent} from './components/ScoreBoard/ScoreBoard.js';
import {ScoreProfileComponent} from './components/ScoreProfile/ScoreProfile.js';
import {Signin} from './components/Signin/signin.js';
import {Registration} from './components/Registration/registration.js';
import {Profile} from './components/Profile/profile.js';

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
					//element.add("scoreboard_score_data");
					//element.innerHTML = 'Че не авторизовался';
					//createMenu();
					return;
				}
				const user = JSON.parse(xhr.responseText);
				element.innerHTML = '';
				createScoreProfile(element, user);
			},
			path: '/users/' + user.nickname,
		});
	}
}

export function createNavbarScoreBoard(users) {
	createNavbar();

	const scoreBoardSection = document.createElement('section');
	scoreBoardSection.dataset.sectionName = 'scoreboard';
	const container = document.createElement('div');
	container.classList.add("scoreboard_container");
	scoreBoardSection.appendChild(container);

	//createScoreProfile(container);
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
	createNavbar();	
	const profileSection = document.createElement('section');
	profileSection.dataset.sectionName = 'profile';
	// renderProfilePage(AjaxModule, me);

	const signin = new Profile({
		el: profileSection,
		type: RENDER_TYPES.TMPL,
	})
	// let listDivs = [{}];
	if (me) {
	
		signin.data = JSON.parse(JSON.stringify(me));
    } else {
		AjaxModule.doGet({
			callback(xhr) {
				if (!xhr.responseText) {
					//alert('Unauthorized');
					application.innerHTML = '';
					createNavbarProfile(AjaxModule);
					return;
				}
				const user = JSON.parse(xhr.responseText);
                application.innerHTML = '';
                createNavbarProfile(user);
				// renderProfilePage(user);
			},
			path: '/users/' + user.nickname,
		});
	}
	signin.render();
	application.appendChild(profileSection);
	// Обработка изменений
	let form = document.getElementsByTagName('form')[0];
	let button = document.getElementsByClassName('profile_change_button')[0];
	button.addEventListener("click", function (event) {
		event.preventDefault();
		const nickname = form.elements[ 'nickname' ].value;
		if ( nickname === me.nickname ){
			console.log('Equal!', nickname);
		} else {
			AjaxModule.doPost({
				callback() {
					application.innerHTML = '';
					createNavbarProfile();
					console.log("Sent");
				},
				path: '/users/' + me.nickname,
				body: {
					nickname,
					password: me.password,
					image: me.image
				},
			});
		}
	});
}

export function createLoginPage(me) {

	const signin = new Signin({
		el: application,
		type: RENDER_TYPES.TMPL,
	})
	signin.render();
	let form = document.getElementsByTagName('form')[0];
	form.addEventListener("submit", function (event) {
		event.preventDefault();
		const nickname = form.elements[ 'nickname' ].value;
		const password = form.elements[ 'password' ].value;
		AjaxModule.doPost({
			callback() {
				application.innerHTML = '';
				//createNavbarProfile();
				createNavbarMenu();
			},
			path: '/signin',
			body: {
				nickname,
				password,
			},
		});
	});

}

export function createRegistrationPage() {
	// renderRegistrationPage(AjaxModule);
	const signup = new Registration({
		el: application,
		type: RENDER_TYPES.TMPL,
	})
	signup.render();
	const form = document.querySelector("form");
	const footer = document.getElementsByClassName('registration_input_footer_divblock_registration')[0];
	const formdata = new FormData(form);
	footer.addEventListener('click', function (event, formdata) {
		let errList = [""];
		event.preventDefault();

        const nickname = form.elements[ 'nickname' ].value;
		const password = form.elements[ 'password' ].value;
		const password_repeat = form.elements[ 'password_repeat' ].value;
		const image = form.elements[ 'image' ].files[0].name;

		if (password !== password_repeat) {
			errList.push("Пароли не одинаковые!");
		}
		if (nickname.length < 4) {
			errList.push("Плохой ник!");
		}
		/*
		if (!email.match(/^([a-z0-9_\-]+\.)*[a-z0-9_\-]+@([a-z0-9][a-z0-9\-]*[a-z0-9]\.)+[a-z]{2,4}$/i)){
			errList.push("Неверно введена почта!");
		}
		*/
		if (password.length < 6){
			errList.push("Пароль короче 6 символов!");
		}
		if (errList.length > 1) {
			const errBlock = document.getElementsByClassName('registration_err_list')[0];
			ShowErrMassage(errBlock, errList);
			return;
		}
		AjaxModule.doPost({
			callback() {
                application.innerHTML = '';
                //createNavbarProfile();
                createNavbarMenu();
				// renderProfilePage();
			},
			path: '/signup',
			//body: formdata,
			body: {
                nickname,
				password,
				image
			},
		});
	});
	function ShowErrMassage(errBlock, errList) {
		errBlock.innerHTML = '';
		errList.forEach(elm => {
			console.log(elm, errList.length);
			errBlock.innerHTML += elm + "<br>"; 
		});
			
	}
}