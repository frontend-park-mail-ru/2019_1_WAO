'use strict';

const express = require('express');
//const formData = require("express-form-data");
const body = require('body-parser');
var formidable = require('formidable');
//const multer = require('multer');
//const upload = multer();
const cookie = require('cookie-parser');
const fs = require('fs');
const uuid = require('uuid/v4');
const path = require('path');
const app = express();

app.use(express.static(path.resolve(__dirname, '..', 'dist')));
app.use(body.json());
//app.use(upload.array());
app.use(cookie());

const users = {
	'Goshan': {
		nickname: 'Goshan',
		email: 'gosha@mail.ru',
		password: '123456',
		score: 700,
		games: 101,
		wins: 100,
		image: "./images/background1.jpg",
	},
	'Pashok': {
		nickname: 'Pashok',
		email: 'pasha@mail.ru',
		password: '123456',
		score: 600,
		games: 51,
		wins: 20,
		image: "./images/background1.jpg",
	},
	'Axmed': {
		nickname: 'Axmed',
		email: 'axmed@mail.ru',
		password: '777777',
		score: 13,
		games: 10000,
		wins: 1,
		image: "./images/background1.jpg",
	},
};
const ids = {};

const setHeadearListOnPage = {
	'Access-Control-Allow-Origin': 'https://front-wao.now.sh',
	'Access-Control-Allow-Credentials': 'true',
	'Access-Control-Allow-Headers': 'Content-Type,Origin',
	"Content-Security-Policy": "default-src 'self'",
};

const setHraderListAdditionInAppUse = {
	'Access-Control-Allow-Origin': 'https://wao2019.herokuapp.com/',
	'Access-Control-Allow-Origin': 'https://127.0.0.1:3000',
	'Access-Control-Allow-Methods': 'GET,PUT,POST,OPTIONS',
};

app.use(function(req, res, next) {
	if (req.method === 'OPTIONS') {
		console.log("OPTIONS");
		setHeaders(res, setHeadearListOnPage);
		setHeaders(res, setHraderListAdditionInAppUse);
		res.end();
		return;
	}
	next();
})

app.get('/api/v1/sessions', function(req, res) {
	console.log("sessions");
	const id = req.cookies.sessionid;
	console.log(id);
	if (!id) {
		return res.status(400).json({error: 'Не валидный Ник'});
	}

	console.log(ids);
	if (ids.hasOwnProperty(id)) {
		const nickname = ids[id];
		const send = {
			nickname: 	users[nickname].nickname,
			email: 		users[nickname].email,
			score: 		users[nickname].score,
			games: 		users[nickname].games,
			wins: 		users[nickname].wins,
		}
		res.json(send);
	} else {
		return res.status(400).json({error: 'Fff'});
	}

});

// Добавляет заголовки в html pdu
function setHeaders(res, list) {
	for (const key in list) {
		if (list.hasOwnProperty(key)) {
			const element = list[key];
			res.header(key, element);
		}
	}
	return res
}

app.post('/api/v1/signup', function (req, res) {
	res = setHeaders(res, setHeadearListOnPage);
	const nickname = req.body.nickname;
	const email = req.body.email;
	const password = req.body.password;
	const image = "./images/background1.jpg";


	console.log("This data was send: pass: ", password, "nickname: ", nickname);
	if (
		!password || !nickname 
		//||
		//!password.match(/^\S{4,}$/) ||
		//!email.match(/@/) ||
		//!nick.match(/^\S{4,}$/)
	) {
		return res.status(400).json({error: 'Не валидные данные пользователя'});
	}
	if (users[nickname]) {
		return res.status(400).json({error: 'Пользователь уже существует'});
	}

	const id = uuid();
	const user = {nickname, password, image, score: 0, games: 0, wins: 0};
	console.log("User: ", user);
	ids[id] = nickname;  
	users[nickname] = user;
	console.log("ids[id]: ", ids, "users[nickname]: ", users );

	res.cookie('sessionid', id, {expires: new Date(Date.now() + 1000 * 60 * 10)});
	res.status(201).json({id});
});

app.post('/api/v1/users/testuser/image', function (req, res) {
	console.log("RX image");
	console.log(req.body);
	const image = req.body.image;

	const id = req.cookies.sessionid;
	const nickname = ids[id];
	const path = "./public/dist/images/" + nickname + ".png";
	res = setHeaders(res, setHeadearListOnPage);

	console.log(image);
	fs.writeFile(path, image, function(error) {
		if (error) {
			throw error;
		}
		console.log('чет сохранил');
	});

	users[nickname].image = path;
	res.status(200).json({id});
});

app.post('/api/v1/signin', function (req, res) {
	console.log(req.body);
	const password = req.body.password;
	const nickname = req.body.nickname;
	if (!password || !nickname) {
		return res.status(400).json({error: 'Не указан E-Mail или пароль'});
	}
	if (!users[nickname] || users[nickname].password !== password) {
		return res.status(400).json({error: 'Не верный E-Mail и/или пароль'});
	}

	const id = uuid();
	ids[id] = nickname;

	res.cookie('sessionid', id, {expires: new Date(Date.now() + 1000 * 60 * 10)});
	res.status(200).json({id});
});

app.get('/api/v1/users/Goshan', function (req, res) {
	res = setHeaders(res, setHeadearListOnPage);
	const id = req.cookies['sessionid'];
	console.log("Give Id ", id);
	const nickname = ids[id];
	console.log("Give nickname ", nickname);
	if (!nickname || !users[nickname]) {
		return res.status(401).end();
	}

	users[nickname].score += 1;
	const send = {
		nickname: users[nickname].nickname,
		email: users[nickname].email,
		score: users[nickname].score,
		games: users[nickname].games,
		wins: users[nickname].wins,
		image: users[nickname].image,
	}
	res.json(send);
});
/*
app.put('/api/v1/users/Goshan', function(req, res) {
	console.log(req.body);
	res = setHeaders(res, setHeadearListOnPage);
	const id = req.cookies['sessionid'];
	const old_nickname = ids[id];

	const nickname = req.body.nickname;
	const email = req.body.email;
	const password = req.body.password;
	const image = req.body.image;

	const imagePath = "../dist/images/Goshan.png"; 
	fs.writeFile(imagePath, image, function(error) {
		if (error) {
			throw error;
		}
		console.log('чет сохранил');
		//console.log(image);
	});

	const user = {
		nickname: nickname,
		email: email,
		password: password,
		score: users[old_nickname].score,
		games: users[old_nickname].games,
		wins: users[old_nickname].wins,
		image: imagePath

	}

	if (nickname != old_nickname) {
		delete users[old_nickname];
		ids[id] = nickname;
	}

	users[nickname] = user;

	console.log("User: ", user);
	ids[id] = nickname;  
	users[nickname] = user;
	console.log("ids[id]: ", ids[id], "users[nickname]: ", users[nickname] );

	console.log("Changed user: ", old_nickname);
	res.cookie('sessionid', id, {expires: new Date(Date.now() + 1000 * 60 * 10)});
	res.status(201).json({id});
});
*/

app.put('/api/v1/users/Goshan', function(req, res) {
    var form = new formidable.IncomingForm();
    form.parse(req);

    let user = {};

    form.on('field', function(name, value) {
    	user[name] = value;
    	console.log(name);
    	console.log(value);
	});

    form.on('fileBegin', function (name, file) {
        file.path = __dirname + '/uploads/' + file.name;
    });

    form.on('file', function (name, file) {
        console.log('Uploaded ' + file.name);
		user.image =  __dirname + '/uploads/' + file.name;
    });

	users[user.nickname] = user;

	res.status(201).json({user});

});

app.get('/api/v1/users', function (req, res) {
	res = setHeaders(res, setHeadearListOnPage);
	const scorelist = Object.values(users)
		.sort((l, r) => r.score - l.score)
		.map(user => {
			return {
				nickname: user.nickname,
				score: user.score,
				games: user.games,
				wins: user.wins
			}
		});
	console.log(scorelist);
	res.json(scorelist);
});

app.get('/api/v1/users/1', function (req, res) {
	res = setHeaders(res, setHeadearListOnPage);
	const scorelist = Object.values(users)
		.sort((l, r) => r.score - l.score)
		.map(user => {
			return {
				nickname: user.nickname,
				score: user.score,
				games: user.games,
				wins: user.wins
			}
		});
	console.log(scorelist);
	res.json(scorelist);
});


const port = process.env.PORT || 3000;
app.listen(port, function () {
	console.log(`Server listening port ${port}`);
});