'use strict';

const express = require('express');
const body = require('body-parser');
const cookie = require('cookie-parser');
const fs = require('fs');
// morgan = require('morgan');
const uuid = require('uuid/v4');
const path = require('path');
const app = express();

// app.use(morgan('dev'));
app.use(express.static(path.resolve(__dirname, '..', 'public', 'dist')));
//app.use(express.static('./public/dist/'));
//app.use(express.static('./public/dist/'));
app.use(body.json());
app.use(cookie());

const users = {
	'Гошан': {
		nickname: 'Гошан',
		password: '123456',
		score: 700,
		games: 101,
		wins: 100,
		image: "./images/background1.jpg",
	},
	'Пашок': {
		nickname: 'Пашок',
		password: '123456',
		score: 600,
		games: 51,
		wins: 20,
		image: "./images/background1.jpg",
	},
	'Ахмед': {
		nickname: 'Ахмед',
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
	const password = req.body.password;
	const nickname = req.body.nickname;
	let image = req.body.image;
	if (image) {
		image = "./images/" + image;
	} else  {
		image = "./images/background1.jpg";
	} 
	/*
	console.log(image);
	fs.writeFile("./public/dist/images/img.png", image, function(error) {
		if (error) {
			throw error;
		}
		console.log('чет сохранил');
	});
	*/

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

app.post('/api/v1/signin', function (req, res) {
	res = setHeaders(res, setHeadearListOnPage);

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
// !!! Хардкод !!!
app.get('/api/v1/users/Гошан', function (req, res) {
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
		score: users[nickname].score,
		games: users[nickname].games,
		wins: users[nickname].wins,
		image: users[nickname].image,
	}
	res.json(send);
});

app.post('/api/v1/users/Гошан/change', function(req, res) {
	res = setHeaders(res, setHeadearListOnPage);
	const nickname = req.body.nickname;
	const old_nickname = req.body.old_nickname;

	const id = uuid();
	const user = {
		nickname,
		password: users[old_nickname].password,
		score: users[old_nickname].score, 
		games: users[old_nickname].games, 
		wins: users[old_nickname].wins, 
		image: "./images/background1.jpg"
	};
	delete users[old_nickname];
	console.log("User: ", user);
	ids[id] = nickname;  
	users[nickname] = user;
	console.log("ids[id]: ", ids[id], "users[nickname]: ", users[nickname] );

	console.log("Changed user: ", old_nickname);
	res.cookie('sessionid', id, {expires: new Date(Date.now() + 1000 * 60 * 10)});
	res.status(201).json({id});
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

	res.json(scorelist);
});


const port = process.env.PORT || 3000;
app.listen(port, function () {
	console.log(`Server listening port ${port}`);
});