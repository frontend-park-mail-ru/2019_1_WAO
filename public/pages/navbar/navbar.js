export function createNavbar() {
	const navbarSection = document.createElement('section');
	navbarSection.dataset.sectionName = 'navbar';

	const container = document.createElement('div');
	container.classList.add("navbar_container");

	const backBtn = document.createElement('a');
	backBtn.textContent = "В меню";
	backBtn.classList.add("navbar_back_btn");
	container.appendChild(backBtn);

	const pageName = document.createElement('a');
	pageName.textContent = "Меню";
	pageName.classList.add("navbar_page_name");
	container.appendChild(pageName);	

	const user = document.createElement('a');
	user.textContent = "Пользователь";
	user.classList.add("navbar_user");
	container.appendChild(user);	

	navbarSection.appendChild(container);
	application.appendChild(navbarSection);
}