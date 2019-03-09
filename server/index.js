'use strict';

const express = require('express');
const body = require('body-parser');
const cookie = require('cookie-parser');
// morgan = require('morgan');
const uuid = require('uuid/v4');
const path = require('path');
const app = express();

// app.use(morgan('dev'));
// app.use(express.static(path.resolve(__dirname, '..', 'public')));
app.use(express.static('./public/dist'));
app.use(body.json());
app.use(cookie());

const users = {
	'example@pochta.ru': {
		email: 'example@pochta.ru',
		password: 'password',
		nick: "Exp",
		score: 100,
		kda: 10.0,
		img: "default",
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
	const user = {password, email, nick, score: 0, kda: 0.0, img: "./../img/user.png"};
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
				email: user.email,
				age: user.age,
				score: user.score,
			}
		});

	res.json(scorelist);
});


const port = process.env.PORT || 3003;
app.listen(port, function () {
	console.log(`Server listening port ${port}`);
});