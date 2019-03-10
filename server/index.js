'use strict';

const express = require('express');
const body = require('body-parser');
const cookie = require('cookie-parser');
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
	'goshan@pochta.ru': {
		email: 'goshan@pochta.ru',
		password: '1234',
		nick: "Гошан",
		score: 700,
		games: 101,
		wins: 100,
		img: "./images/background1.jpg",
	},
	'pashok@pochta.ru': {
		email: 'pashok@pochta.ru',
		password: '2345',
		nick: "Пашок",
		score: 600,
		games: 121,
		wins: 50,
		img: "./images/background1.jpg",
	},
	'LexaXXX@pochta.ru': {
		email: 'LexaXXX@pochta.ru',
		password: '3456',
		nick: "Лёха",
		score: 1,
		games: 1000,
		wins: 7,
		img: "./images/background1.jpg",
	},
	'Igor@pochta.ru': {
		email: 'LexaXXX@pochta.ru',
		password: '4567',
		nick: "Игорь",
		score: 0,
		games: 1000,
		wins: 0,
		img: "./images/background1.jpg",
	},
	'karman@pochta.ru': {
		email: 'karman@pochta.ru',
		password: '5678',
		nick: "Карман",
		score: 6,
		games: 4,
		wins: 1,
		img: "./images/background1.jpg",
	},
};
const ids = {};

app.post('/signup', function (req, res) {
	const password = req.body.password;
	const email = req.body.email;
	const nick = req.body.nick;
	console.log("This data was send: pass: ", password, "email: ", email, "nick: ", nick);
	if (
		!password || !email || !nick //||
		//!password.match(/^\S{4,}$/) ||
		//!email.match(/@/) ||
		//!nick.match(/^\S{4,}$/)
	) {
		return res.status(400).json({error: 'Не валидные данные пользователя'});
	}
	if (users[email]) {
		return res.status(400).json({error: 'Пользователь уже существует'});
	}

	const id = uuid();
	const user = {password, email, nick, score: 0, games: 0, wins: 0, img: "./images/background1.jpg"};
	console.log("User: ", user);
	ids[id] = email;  
	users[email] = user;
	console.log("ids[id]: ", ids, "users[email]: ", users );

	res.cookie('sessionid', id, {expires: new Date(Date.now() + 1000 * 60 * 10)});
	res.status(201).json({id});
});

app.post('/login', function (req, res) {
	const password = req.body.password;
	const email = req.body.email;
	if (!password || !email) {
		return res.status(400).json({error: 'Не указан E-Mail или пароль'});
	}
	if (!users[email] || users[email].password !== password) {
		return res.status(400).json({error: 'Не верный E-Mail и/или пароль'});
	}

	const id = uuid();
	ids[id] = email;

	res.cookie('sessionid', id, {expires: new Date(Date.now() + 1000 * 60 * 10)});
	res.status(200).json({id});
});

app.get('/me', function (req, res) {
	const id = req.cookies['sessionid'];
	console.log("Give Id ", id);
	const email = ids[id];
	console.log("Give email ", email);
	if (!email || !users[email]) {
		return res.status(401).end();
	}

	users[email].score += 1;

	res.json(users[email]);
});

app.get('/users', function (req, res) {
	const scorelist = Object.values(users)
		.sort((l, r) => r.score - l.score)
		.map(user => {
			return {
				nick: user.nick,
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