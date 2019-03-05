export function createMenu() {
	const menuSection = document.createElement('section');
	menuSection.dataset.sectionName = 'menu';

	const container = document.createElement('div');
	container.classList.add("menu_container");

	const menuTitles = [
		{name: "Играть",	href: "#",			styles: ['menu_btn',	'm1']},
		{name: "Профиль",	href: "#",			styles: ['menu_btn',	'm2']},
		{name: "Лидеры",	href: "scoreboard",	styles: ['menu_btn',	'm3']},
		{name: "Правила",	href: "rules",		styles: ['menu_btn',	'm4']},
		{name: "Авторы",	href: "#",			styles: ['menu_btn',	'm5']}
	];

	menuTitles.forEach(item => {
		const a = document.createElement('a');
		a.dataset.href = item.href;
		a.textContent = item.name;
		for (const key in item.styles) {
			a.classList.add(item.styles[key])
		}
		container.appendChild(a);
	});

	menuSection.appendChild(container);
	application.appendChild(menuSection);
}