'use strict';

import {createNavbar} from './pages/navbar/navbar.js';

import {createMenu} from './pages/menu/menu.js';
import {createScoreBoard} from './pages/scoreboard/scoreboard.js';
import {createRules} from './pages/rules/rules.js';

import {renderLoginPage} from './pages/login/login.js';
// import {renderProfilePage} from './pages/profile/profile.js';
// import {renderRegistrationPage} from './pages/registration/registration.js';

import AjaxModule from './modules/ajax.js';

const application = document.getElementById('application');


export function renderRegistrationPage() {
    // let stylePath = "./pages/login/login.css";
    // addCustomLinkCss(stylePath);

    let container = document.createElement('div');
    container.classList.add('registration_container');

    let title = document.createElement('div');
    title.classList.add('registration_title');
    title.textContent = "Регистрация";

    let body = document.createElement('div');
    body.classList.add('registration_body');

    let form = document.createElement('form');
    form.action = "#";
    form.method = "POST";

    // let input1 = document.createElement('input');
    // input1.type = "text";
    // input1.placeholder = "Ник";
    // input1.classList.add('registration_input_name');

    let input2 = document.createElement('input');
    input2.type = "text";
    input2.placeholder = "Ник";
    input2.classList.add('registration_input_lastname');
    input2.name = "nick";

    let input3 = document.createElement('input');
    input3.type = "email";
    input3.placeholder = "Email";
    input3.classList.add('registration_input_email');
    input3.name = "email";

    let input4 = document.createElement('input');
    input4.type = "password";
    input4.placeholder = "Пароль";
    input4.classList.add('registration_input_password');
    input4.name = "password";

    let input5 = document.createElement('input');
    input5.type = "password";
    input5.placeholder = "Повторите пароль";
    input5.classList.add('registration_input_repassword');
    input5.name = "password_repeat";

    let footer = document.createElement('div');
    footer.classList.add('registration_input_footer_divblock');

    let footerA1 = document.createElement('a');
    footerA1.classList.add('registration_input_footer_divblock_registration');
    footerA1.href = "#";
    footerA1.textContent = "Зарегистрироваться"

    let footerA2 = document.createElement('a');
    footerA2.classList.add('registration_input_footer_divblock_menu');
    footerA2.href = "#";
    footerA2.textContent = "К Меню"

    footer.appendChild(footerA1);
    footer.appendChild(footerA2);
    // form.appendChild(input1);
    form.appendChild(input2);
    form.appendChild(input3);
    form.appendChild(input4);
    form.appendChild(input5);
    form.appendChild(footer);
    body.appendChild(form);
    container.appendChild(title);
    container.appendChild(body);

    footerA1.addEventListener('click', function (event) {
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
                //renderRegistrationPage();
				renderProfilePage();
			},
			path: '/signup',
			body: {
                nick: nick,
				email: email,
				password: password,
			},
		});
	});

    application.appendChild(container);
}

export function renderProfilePage(me) {
    let container = document.createElement('div');
    container.classList.add("profile_container");
    let containerTop = document.createElement('div');
    containerTop.classList.add("profile_container_top");

    let profileTitle = document.createElement('div');
    profileTitle.classList.add("profile_title");
    profileTitle.textContent = "Профиль";
    let profilePhoto = document.createElement('div');
    profilePhoto.classList.add("profile_photo");
    profilePhoto.textContent = "ИИ";

    containerTop.appendChild(profileTitle);
    containerTop.appendChild(profilePhoto);

    let profileContainerGridblock = document.createElement('div');
    profileContainerGridblock.classList.add("profile_container_gridblock");

    containerTop.appendChild(profileContainerGridblock);
    container.appendChild(containerTop);

    let profileDataFooter = document.createElement('div');
    profileDataFooter.classList.add("profile_data_footer");

    let profileChangeButton = document.createElement('a');
    profileChangeButton.classList.add("profile_change_button");
    profileChangeButton.href = "#";
    let profileChangeButtonPic = document.createElement('div');
    profileChangeButtonPic.classList.add("profile_change_button_pic");
    let svg1 = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M7.627 13.203l4.237-4.237 2.17 2.17-3.152 3.152-1.085 1.085c-.001.001-.243.225-.712.314l-1.621.306a.438.438 0 0 1-.36-.097.438.438 0 0 1-.097-.36l.306-1.621c.089-.468.312-.71.314-.712zM5.557 14H2.013a1 1 0 0 1-1-1v-.3c0-2.48 2.01-4.494 4.488-4.5v-.796a3 3 0 0 1-1.488-2.591V3a3.001 3.001 0 0 1 6 0v1.813a3 3 0 0 1-1.488 2.591V8.2a4.52 4.52 0 0 1 1.199.165 2477.73 2477.73 0 0 0-3.326 3.329c-.004.004-.509.552-.71 1.611L5.557 14zm8.994-6.812a.643.643 0 0 0-.909 0l-.856.856 2.17 2.17.856-.856a.643.643 0 0 0 0-.909l-1.261-1.261z"/></svg>';
    profileChangeButtonPic.innerHTML = svg1;
    let profileChangeButtonText = document.createElement('div');
    profileChangeButtonText.classList.add("profile_change_button_text");
    profileChangeButtonText.textContent = "Изменить";


    profileChangeButton.appendChild(profileChangeButtonPic);
    profileChangeButton.appendChild(profileChangeButtonText);
    profileDataFooter.appendChild(profileChangeButton);

    let profileDeleteButton = document.createElement('a');
    profileDeleteButton.classList.add("profile_delete_button");
    profileDeleteButton.href = "#";
    let profileDeleteButtonPic = document.createElement('div');
    profileDeleteButtonPic.classList.add("profile_delete_button_pic");
    let svg2 = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M12.437 6a.463.463 0 0 1 .464.489l-.367 6.679c0 1.104-.914 1.84-2.018 1.84H5.548c-1.103 0-2.017-.686-2.017-1.79l-.436-6.724A.462.462 0 0 1 3.558 6h8.879zM2.128 5a.529.529 0 0 1-.531-.525l.001-.012c0-.414.251-.769.608-.922.455-.241 1.681-.439 3.292-.542V1.41C5.498.632 6.13 0 6.908 0h2.184c.778 0 1.41.632 1.41 1.41v1.589c1.611.103 2.837.301 3.292.542.357.153.608.508.608.922 0 .297-.24.537-.537.537H2.128zm6.571-3.407H7.301A.301.301 0 0 0 7 1.894v1.041a46.454 46.454 0 0 1 2 0V1.894a.301.301 0 0 0-.301-.301z"/></svg>';
    profileDeleteButtonPic.innerHTML = svg1;
    let profileDeleteButtonText = document.createElement('div');
    profileDeleteButtonText.classList.add("profile_delete_button_text");
    profileDeleteButtonText.textContent = "Удалить";

    profileDeleteButton.appendChild(profileDeleteButtonPic);
    profileDeleteButton.appendChild(profileDeleteButtonText);
    profileDataFooter.appendChild(profileDeleteButton);
    
    container.appendChild(profileDataFooter);
    application.appendChild(container);
    let listDivs = [{}];
    if (me) {
        listDivs = [
            {left: "Никнейм", right: me.nick},
            {left: "Email", right: me.email},
            {left: "Очки", right: me.score},
            {left: "KDA", right: me.kda},
        ];
    } else {
		AjaxModule.doGet({
			callback(xhr) {
				if (!xhr.responseText) {
                    console.log('Unauthorized');
					//alert('Unauthorized');
					application.innerHTML = '';
					createNavbarProfile();
					return;
				}

				const user = JSON.parse(xhr.responseText);
				application.innerHTML = '';
				renderProfilePage(user);
			},
			path: '/me',
		});
	}
    
    let tmp_schet = 1;
    listDivs.forEach(item =>{
        let profileData = document.createElement('div');
        profileData.classList.add("profile_data_" + tmp_schet++);
        let profileDataBottomBorderDiv = document.createElement('div');
        profileDataBottomBorderDiv.classList.add("profile_data_bottom_border_div");

        let left = document.createElement('div');
        left.classList.add("left_data");
        left.textContent = item.left;

        let right = document.createElement('div');
        right.classList.add("right_data");
        right.textContent = item.right;

        profileDataBottomBorderDiv.appendChild(left);
        profileDataBottomBorderDiv.appendChild(right);
        profileData.appendChild(profileDataBottomBorderDiv);
        profileContainerGridblock.appendChild(profileData);
    })
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
