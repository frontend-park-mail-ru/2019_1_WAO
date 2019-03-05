const impPath = "./img/";

export function createScoreBoard () {
	const scoreBoardSection = document.createElement('section');
	scoreBoardSection.dataset.sectionName = 'scoreboard';

	const container = document.createElement('div');
	container.classList.add("container");

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

	container.appendChild(header);

	const table = document.createElement('div');
	table.classList.add("table");

	const tableContent = [
		[
			{name: "№", 		styles : ["col", "col_head", "column_1"]},
			{name: "nickname", 	styles : ["col", "col_head", "column_2"]},
			{name: "score", 	styles : ["col", "col_head", "column_3"]},
			{name: "ratio", 	styles : ["col", "col_head", "column_4"]}
		],
		[
			{name: "1", 		styles : ["col", "column_1"]},
			{name: "Ибрагим", 	styles : ["col", "column_2"]},
			{name: "9999", 		styles : ["col", "column_3"]},
			{name: "10.0", 		styles : ["col", "column_4"]}
		],
		[
			{name: "2", 		styles : ["col", "column_1"]},
			{name: "Гошан", 	styles : ["col", "column_2"]},
			{name: "1000", 		styles : ["col", "column_3"]},
			{name: "0", 		styles : ["col", "column_4"]}
		],
		[
			{name: "3", 		styles : ["col", "column_1"]},
			{name: "Ахмед", 	styles : ["col", "column_2"]},
			{name: "999", 		styles : ["col", "column_3"]},
			{name: "1", 		styles : ["col", "column_4"]}
		],
		[
			{name: "4", 		styles : ["col", "column_1"]},
			{name: "Димас", 	styles : ["col", "column_2"]},
			{name: "777", 		styles : ["col", "column_3"]},
			{name: "0.5", 		styles : ["col", "column_4"]}
		],
		[
			{name: "5", 		styles : ["col", "column_1"]},
			{name: "Лёха", 		styles : ["col", "column_2"]},
			{name: "19", 		styles : ["col", "column_3"]},
			{name: "0.1", 		styles : ["col", "column_4"]}
		]
	]

	tableContent.forEach(row => {
		const table_row = document.createElement('div');
		table_row.classList.add("table-row");

		row.forEach(column => {
			const col = document.createElement('div');
			col.textContent = column.name;	
			column.styles.forEach(style => {
				col.classList.add(style);
			});
			table_row.appendChild(col);
		});
		table.appendChild(table_row);
	});

	container.appendChild(table);

	scoreBoardSection.appendChild(container);
	application.appendChild(scoreBoardSection);
}
