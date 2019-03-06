'use strict';

const application = document.getElementById('application');

function ajax (callback, method, path, body) {
	const xhr = new XMLHttpRequest();
	xhr.open(method, path, true);
	xhr.withCredentials = true;

	if (body) {
		xhr.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
	}

	xhr.onreadystatechange = function () {
		if (xhr.readyState !== 4) {
			return;
		}

		callback(xhr);
	};

	if (body) {
		xhr.send(JSON.stringify(body));
	} else {
		xhr.send();
	}
}

/*
function createMenuLink () {
	const menuLink = document.createElement('a');
	menuLink.href = menuLink.dataset.href = 'menu';

	menuLink.textContent = 'Back to main menu';

	return menuLink;
}
*/

const impPath = "./img/";

function createScoreBoard () {
	const scoreBoardSection = document.createElement('section');
	scoreBoardSection.dataset.sectionName = 'scoreboard';

	const container = document.createElement('div');
	container.classList.add("container");

	const menu_btn = document.createElement('div');
	menu_btn.classList.add("menu_btn");
	menu_btn.href = "#";
	menu_btn.textContent = "В меню";

	const header = document.createElement('div');
	header.classList.add("header");

	const user_data = document.createElement('div');
	user_data.classList.add("user_data");

	const user_img = document.createElement('img');
	user_img.src = impPath + "user.png";
	user_img.classList.add("img");
	user_img.classList.add("user_img");

	const user_name = document.createElement('a');		
	user_name.href = "#";
	//user_name.dataset.href = href;
	user_name.textContent = "Гошан";
	user_name.classList.add("user_name");

	const score_data = document.createElement('div');
	score_data.classList.add("score_data");

	const score_data_1 = document.createElement('a');
	score_data_1.textContent = "Счёт: 1000";
	score_data_1.classList.add("score_data_1");
	const score_data_2 = document.createElement('a');
	score_data_2.textContent = "Побед: 0";
	score_data_2.classList.add("score_data_2");
	const score_data_3 = document.createElement('a');
	score_data_3.textContent = "Поражений: 999";
	score_data_3.classList.add("score_data_3");


	user_data.appendChild(user_img);
	user_data.appendChild(user_name);
	score_data.appendChild(score_data_1);
	score_data.appendChild(score_data_2);
	score_data.appendChild(score_data_3);
	header.appendChild(user_data);
	header.appendChild(score_data);

	const table = document.createElement('div');
	table.classList.add("table");

	const table_row_0 = document.createElement('div');
	table_row_0.classList.add("table-row");
	const cols_0 = {num: "№",	nickname: "nickname", score: "score", pobed: "pobed"}

	let i = 1;
	for (const key in cols_0) {
		const col = document.createElement('div');
		const a = document.createElement('a');
		a.textContent = cols_0[key];
		col.appendChild(a);		
		col.classList.add("col");
		col.classList.add("col_head");
		col.classList.add("column_" + i.toString());
		table_row_0.appendChild(col);		
		i++;
	}
	table.appendChild(table_row_0);

	const table_row = [];
	for (let i = 0; i < 9; i++) {
		table_row[i] = document.createElement('div');
		table_row[i].classList.add("table-row");
		const cols_n = {num: "1",	nickname: "Nick1", score: "1000", pobed: "11.1"}

		let j = 1;
		for (const key in cols_n) {
			const col = document.createElement('div');
			const a = document.createElement('a');
			a.textContent = cols_n[key];
			col.appendChild(a);		
			col.classList.add("col");
			col.classList.add("column_" + j.toString());
			table_row[i].appendChild(col);		
			j++;
		}
		table.appendChild(table_row[i]);
	}

	container.appendChild(menu_btn);
	container.appendChild(header);
	container.appendChild(table);

	scoreBoardSection.appendChild(container);
	application.appendChild(scoreBoardSection);
}

function createRule() {
	const ruleSection = document.createElement('section');
	ruleSection.dataset.sectionName = 'rule';

	const container = document.createElement('div');
	container.classList.add("rules_container");

	///
	const menu_btn = document.createElement('div');
	menu_btn.classList.add("menu_btn");
	menu_btn.href = "#";
	menu_btn.textContent = "В меню";
	container.appendChild(menu_btn);
	//

	for (let i = 0; i < 8; i++) {
		const a = document.createElement('a');
		a.textContent = "Правило " + i.toString();
		a.classList.add("rule");
		a.classList.add("r" + i.toString());
		container.appendChild(a);
	}

	ruleSection.appendChild(container);
	application.appendChild(ruleSection);
}

const pages = {
	scoreboard: createScoreBoard,	
	rule: 		createRule
};

//createScoreBoard();
createRule();
