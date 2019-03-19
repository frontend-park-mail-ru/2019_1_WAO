import * as Add_router from '../../routers_functions.js';

export function renderRegistrationPage(AjaxModule) {
  const container = document.createElement('div');
  container.classList.add('registration_container');

  const title = document.createElement('div');
  title.classList.add('registration_title');
  title.textContent = 'Регистрация';

  const body = document.createElement('div');
  body.classList.add('registration_body');

  const form = document.createElement('form');
  form.action = '#';
  form.method = 'POST';

  const input2 = document.createElement('input');
  input2.type = 'text';
  input2.placeholder = 'Ник';
  input2.classList.add('registration_input_lastname');
  input2.name = 'nick';

  const input3 = document.createElement('input');
  input3.type = 'email';
  input3.placeholder = 'Email';
  input3.classList.add('registration_input_email');
  input3.name = 'email';

  const input4 = document.createElement('input');
  input4.type = 'password';
  input4.placeholder = 'Пароль';
  input4.classList.add('registration_input_password');
  input4.name = 'password';

  const input5 = document.createElement('input');
  input5.type = 'password';
  input5.placeholder = 'Повторите пароль';
  input5.classList.add('registration_input_repassword');
  input5.name = 'password_repeat';

  const footer = document.createElement('div');
  footer.classList.add('registration_input_footer_divblock');

  const footerA1 = document.createElement('a');
  footerA1.classList.add('registration_input_footer_divblock_registration');
  footerA1.href = '#';
  footerA1.textContent = 'Зарегистрироваться';

  const footerA2 = document.createElement('a');
  footerA2.classList.add('registration_input_footer_divblock_menu');
  footerA2.href = '#';
  footerA2.textContent = 'К Меню';

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

  footerA1.addEventListener('click', function(event) {
    event.preventDefault();

    const nick = form.elements['nick'].value;
    const email = form.elements['email'].value;
    const password = form.elements['password'].value;
    const password_repeat = form.elements['password_repeat'].value;

    if (password !== password_repeat) {
      alert('Passwords is not equals');

      return;
    }

    AjaxModule.doPost({
      callback() {
        application.innerHTML = '';
        Add_router.createNavbarProfile();
        // renderProfilePage();
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
