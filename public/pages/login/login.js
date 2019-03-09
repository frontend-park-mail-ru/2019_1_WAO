import * as Add_router from '../../routers_functions.js';

export function renderLoginPage(AjaxModule) {
    let container = document.createElement('div');
    container.classList.add("login_window");

    let loginWindowDivTitle = document.createElement('div');
    loginWindowDivTitle.classList.add("login_window_div_title");

    let loginWindowTitle = document.createElement('div');
    loginWindowTitle.classList.add("login_window_title");
    loginWindowTitle.textContent = "Войти";
    let loginWindowTitlePic = document.createElement('div');
    loginWindowTitlePic.classList.add("login_window_title_pic");
    let svg1 = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M6.586 8L4.293 5.707a.999.999 0 1 1 1.414-1.414L8 6.586l2.293-2.293a1 1 0 0 1 1.414 1.414L9.414 8l2.293 2.293a1 1 0 0 1-1.414 1.414L8 9.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L6.586 8z"/></svg>';
    loginWindowTitlePic.innerHTML = svg1;

    loginWindowDivTitle.appendChild(loginWindowTitle);
    loginWindowDivTitle.appendChild(loginWindowTitlePic);
    container.appendChild(loginWindowDivTitle);

    let loginWindowForm = document.createElement('div');
    loginWindowForm.classList.add("login_window_form");
    let form = document.createElement('form');
    form.action = "#"; form.method = "POST";
    loginWindowForm.appendChild(form);

    let loginWindowDivInForm = document.createElement('div');
    loginWindowDivInForm.classList.add("login_window_div_in_form");

    let inputDivLogin = document.createElement('div');
    inputDivLogin.classList.add("input_div_login");
	let loginWindowPhone = document.createElement('input');
	loginWindowPhone.name = "email";
    loginWindowPhone.classList.add("login_window_phone");
    loginWindowPhone.classList.add("form_window");
    loginWindowPhone.type = "text";
    loginWindowPhone.placeholder = "Электронная почта";
    inputDivLogin.appendChild(loginWindowPhone);
    loginWindowDivInForm.appendChild(inputDivLogin);

    let inputDivPass = document.createElement('div');
    inputDivPass.classList.add("input_div_pass");
    let formWindow = document.createElement('input');
	formWindow.classList.add("form_window");
	formWindow.name = "password";
    formWindow.type = "password";
    formWindow.placeholder = "Пароль";

    let loginWindowPic = document.createElement('div');
    loginWindowPic.classList.add("login_window_pic");
    let svg2 = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M8 1.488c-5.302 0-8 5.21-8 6.512 0 1.302 2.791 6.512 8 6.512S16 9.302 16 8c0-1.302-2.698-6.512-8-6.512zm0 10.233A3.731 3.731 0 0 1 4.279 8 3.731 3.731 0 0 1 8 4.279 3.731 3.731 0 0 1 11.721 8 3.731 3.731 0 0 1 8 11.721zM8 6c1.143 0 2 .953 2 2 0 1.143-.952 2-2 2-1.143 0-2-.952-2-2 0-1.142.857-2 2-2z"/></svg>';
    loginWindowPic.innerHTML = svg2;
    
    inputDivPass.appendChild(formWindow);
    inputDivPass.appendChild(loginWindowPic);
    loginWindowDivInForm.appendChild(inputDivPass);

    let forgotPass = document.createElement('div');
    forgotPass.classList.add("forgot_pass");
    let checkbox = document.createElement('input');
    checkbox.classList.add("checkbox");
    checkbox.type = "checkbox";
    checkbox.checked = "checked";
    let checkboxIcon = document.createElement('span');
    checkboxIcon.classList.add("checkbox_icon");
    let forgotPassCheckboxText = document.createElement('div');
    forgotPassCheckboxText.classList.add("forgot_pass_checkbox_text");
    forgotPassCheckboxText.textContent = "Запомнить пароль";
    let a1 = document.createElement('a');
    a1.href = "#"; a1.textContent = "Забыли пароль?";

    forgotPass.appendChild(checkbox);
    forgotPass.appendChild(checkboxIcon);
    forgotPass.appendChild(forgotPassCheckboxText);
    forgotPass.appendChild(a1);
    loginWindowDivInForm.appendChild(forgotPass);

    let signIn = document.createElement('div');
    signIn.classList.add("sign_in");
    let input1 = document.createElement('input');
    input1.type = "submit";
    input1.value = "Войти";
    signIn.appendChild(input1);
    loginWindowDivInForm.appendChild(signIn);

    let signInContinue = document.createElement('div');
    signInContinue.classList.add("sign_in_continue");
    signInContinue.textContent = "или продолжить через";
    let signInWithSoc = document.createElement('div');
    signInWithSoc.classList.add("sign_in_with_soc");
    loginWindowDivInForm.appendChild(signInContinue);
    loginWindowDivInForm.appendChild(signInWithSoc);

    const aList = [
        { href: "", class: "sign_in_socblock_1", svg: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M15.623 3.901c.119-.373 0-.644-.525-.644h-1.745c-.441 0-.644.238-.763.492 0 0-.898 2.169-2.152 3.575-.406.407-.593.542-.813.542-.119 0-.271-.135-.271-.508V3.884c0-.44-.136-.644-.509-.644H6.1c-.271 0-.44.204-.44.407 0 .424.627.525.694 1.712v2.575c0 .559-.101.661-.322.661-.593 0-2.033-2.186-2.897-4.677-.17-.491-.339-.678-.78-.678H.593c-.508 0-.593.238-.593.492 0 .457.593 2.762 2.762 5.812 1.44 2.084 3.491 3.203 5.338 3.203 1.118 0 1.254-.255 1.254-.678v-1.576c0-.508.101-.593.457-.593.254 0 .712.135 1.746 1.135 1.186 1.186 1.389 1.729 2.05 1.729h1.745c.509 0 .746-.255.61-.746-.152-.491-.728-1.203-1.474-2.05-.407-.475-1.017-1-1.203-1.254-.254-.339-.186-.475 0-.78-.017 0 2.118-3.016 2.338-4.033"/></svg>'},
        { href: "", class: "sign_in_socblock_2", svg: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M8.614 8.147h2.097s.217-.663.289-1.62v-.148.074-.368H8.542v-2.36c0-.22.362-.59.65-.59h1.519V1H9.41C6.663 1 6.446 3.505 6.446 3.874v2.284H5v2.21h1.446V15h2.168V8.147z"/></svg>'},
        { href: "", class: "sign_in_socblock_3", svg: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M8 8.262c1.999 0 3.584-1.606 3.584-3.631C11.584 2.676 9.999 1 8 1S4.416 2.606 4.416 4.63c0 2.026 1.585 3.632 3.584 3.632zm0-5.097c.827 0 1.516.698 1.516 1.466 0 .838-.689 1.466-1.516 1.466-.827 0-1.516-.698-1.516-1.466S7.173 3.165 8 3.165zm1.447 8.03l2.137 2.024a1.022 1.022 0 0 1 0 1.467 1.072 1.072 0 0 1-1.516 0l-2-1.955-1.998 1.955c-.207.21-.482.28-.758.28s-.551-.07-.758-.28a1.022 1.022 0 0 1 0-1.467l1.999-2.024c-.69-.14-1.448-.42-2.068-.838-.482-.35-.62-.978-.344-1.467.275-.489.964-.628 1.447-.349 1.447.908 3.377.908 4.824 0 .483-.28 1.172-.14 1.447.35.276.488.138 1.186-.344 1.466-.62.419-1.31.698-2.068.838z"/></svg>'}
    ];
    aList.forEach(item => {
        let a = document.createElement('a');
        a.classList.add(item.class);
        a.href = item.href === "" ? "#" : item.href;
        a.innerHTML = item.svg;
        signInWithSoc.appendChild(a);
    })

    let signInBottom = document.createElement('div');
    signInBottom.classList.add("sign_in_bottom");
    let a2 = document.createElement('a');
    a2.href = "#"; a2.textContent = "Зарегистрироваться";
    signInBottom.appendChild(a2);
    loginWindowDivInForm.appendChild(signInBottom);
    form.appendChild(loginWindowDivInForm);
	container.appendChild(loginWindowForm);
	
	form.addEventListener('submit', function (event) {
		event.preventDefault();

		const email = form.elements[ 'email' ].value;
		const password = form.elements[ 'password' ].value;

		AjaxModule.doPost({
			callback() {
				application.innerHTML = '';
				Add_router.createNavbarProfile();
			},
			path: '/login',
			body: {
				email: email,
				password: password,
			},
		});
	});


    application.appendChild(container);
}