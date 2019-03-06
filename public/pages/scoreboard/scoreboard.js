const impPath = "../../img/";

export function createScoreBoard () {
	const scoreBoardSection = document.createElement('section');
	scoreBoardSection.dataset.sectionName = 'scoreboard';

	const container = document.createElement('div');
	container.classList.add("scoreboard_container");

	const header = document.createElement('div');
	header.classList.add("scoreboard_header");

	const user_data = document.createElement('div');
	user_data.classList.add("scoreboard_user_data");

	const user_img = document.createElement('img');
	user_img.src = impPath + "user.png";
	user_img.classList.add("scoreboard_img");
	user_img.classList.add("scoreboard_user_img");

	const user_name = document.createElement('a');		
	user_name.href = "#";
	//user_name.dataset.href = href;
	user_name.textContent = "Гошан";
	user_name.classList.add("scoreboard_user_name");

	const score_data = document.createElement('div');
	score_data.classList.add("scoreboard_score_data");

	const score_data_1 = document.createElement('a');
	score_data_1.textContent = "Счёт: 1000";
	score_data_1.classList.add("scoreboard_score_data_1");
	const score_data_2 = document.createElement('a');
	score_data_2.textContent = "Побед: 0";
	score_data_2.classList.add("scoreboard_score_data_2");
	const score_data_3 = document.createElement('a');
	score_data_3.textContent = "Поражений: 999";
	score_data_3.classList.add("scoreboard_score_data_3");


	user_data.appendChild(user_img);
	user_data.appendChild(user_name);
	score_data.appendChild(score_data_1);
	score_data.appendChild(score_data_2);
	score_data.appendChild(score_data_3);
	header.appendChild(user_data);
	header.appendChild(score_data);

	container.appendChild(header);

	const table = document.createElement('div');
	table.classList.add("scoreboard_table");

	const tableContent = [
		[
			{name: "№", 		styles : ["scoreboard_col", "scoreboard_col_head", "scoreboard_column_1"]},
			{name: "nickname", 	styles : ["scoreboard_col", "scoreboard_col_head", "scoreboard_column_2"]},
			{name: "score", 	styles : ["scoreboard_col", "scoreboard_col_head", "scoreboard_column_3"]},
			{name: "ratio", 	styles : ["scoreboard_col", "scoreboard_col_head", "scoreboard_column_4"]}
		],
		[
			{name: "1", 		styles : ["scoreboard_col", "scoreboard_column_1"]},
			{name: "Ибрагим", 	styles : ["scoreboard_col", "scoreboard_column_2"]},
			{name: "9999", 		styles : ["scoreboard_col", "scoreboard_column_3"]},
			{name: "10.0", 		styles : ["scoreboard_col", "scoreboard_column_4"]}
		],
		[
			{name: "2", 		styles : ["scoreboard_col", "scoreboard_column_1"]},
			{name: "Гошан", 	styles : ["scoreboard_col", "scoreboard_column_2"]},
			{name: "1000", 		styles : ["scoreboard_col", "scoreboard_column_3"]},
			{name: "0", 		styles : ["scoreboard_col", "scoreboard_column_4"]}
		],
		[
			{name: "3", 		styles : ["scoreboard_col", "scoreboard_column_1"]},
			{name: "Ахмед", 	styles : ["scoreboard_col", "scoreboard_column_2"]},
			{name: "999", 		styles : ["scoreboard_col", "scoreboard_column_3"]},
			{name: "1", 		styles : ["scoreboard_col", "scoreboard_column_4"]}
		],
		[
			{name: "4", 		styles : ["scoreboard_col", "scoreboard_column_1"]},
			{name: "Димас", 	styles : ["scoreboard_col", "scoreboard_column_2"]},
			{name: "777", 		styles : ["scoreboard_col", "scoreboard_column_3"]},
			{name: "0.5", 		styles : ["scoreboard_col", "scoreboard_column_4"]}
		],
		[
			{name: "5", 		styles : ["scoreboard_col", "scoreboard_column_1"]},
			{name: "Лёха", 		styles : ["scoreboard_col", "scoreboard_column_2"]},
			{name: "19", 		styles : ["scoreboard_col", "scoreboard_column_3"]},
			{name: "0.1", 		styles : ["scoreboard_col", "scoreboard_column_4"]}
		]
	]

	tableContent.forEach(row => {
		const table_row = document.createElement('div');
		table_row.classList.add("scoreboard_table-row");

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
