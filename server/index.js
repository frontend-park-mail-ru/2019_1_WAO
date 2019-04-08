

const fallback = require('express-history-api-fallback');
const express = require('express');
const body = require('body-parser');
let formidable = require('formidable');
const cookie = require('cookie-parser');
const fs = require('fs');
const uuid = require('uuid/v4');
const path = require('path');

const app = express();

app.use(express.static(path.resolve(__dirname, '..', 'dist')));
// app.use(fallback('index.html', { root: 'dist' }));
app.use(body.json());
app.use(cookie());

const default_image = './uploads/user.png';

const users = {
	Goshan: {
		nickname: 'Goshan',
		email: 'gosha@mail.ru',
		password: '123456',
		score: 700,
		games: 101,
		wins: 100,
		image: default_image,
	},
	Pashok: {
		nickname: 'Pashok',
		email: 'pasha@mail.ru',
		password: '123456',
		score: 600,
		games: 51,
		wins: 20,
		image: default_image,
	},
	Axmed: {
		nickname: 'Axmed',
		email: 'axmed@mail.ru',
		password: '777777',
		score: 13,
		games: 10000,
		wins: 1,
		image: default_image,
	},
	Borisa: {
		nickname: 'Borisa',
		email: 'axmed@mail.ru',
		password: '777777',
		score: 13,
		games: 10000,
		wins: 1,
		image: default_image,
	},
	Egorik: {
		nickname: 'Egorik',
		email: 'axmed@mail.ru',
		password: '777777',
		score: 13,
		games: 10000,
		wins: 1,
		image: default_image,
	},
	p77777: {
		nickname: 'p77777',
		email: 'axmed@mail.ru',
		password: '777777',
		score: 13,
		games: 10000,
		wins: 1,
		image: default_image,
	},
	Drugan: {
		nickname: 'Drugan',
		email: 'axmed@mail.ru',
		password: '777777',
		score: 13,
		games: 10000,
		wins: 1,
		image: default_image,
	},
	Vragan: {
		nickname: 'Vragan',
		email: 'axmed@mail.ru',
		password: '777777',
		score: 13,
		games: 10000,
		wins: 1,
		image: default_image,
	},
	Ugolovgin: {
		nickname: 'Ugolovgin',
		email: 'axmed@mail.ru',
		password: '777777',
		score: 13,
		games: 10000,
		wins: 1,
		image: default_image,
	},
	Frontend: {
		nickname: 'Frontend',
		email: 'axmed@mail.ru',
		password: '777777',
		score: 130,
		games: 1000,
		wins: 1,
		image: default_image,
	},
	graphql: {
		nickname: 'graphql',
		email: 'axmed@mail.ru',
		password: '777777',
		score: 223,
		games: 10000,
		wins: 122,
		image: default_image,
	},
	Iiiiiiii: {
		nickname: 'Iiiiiiii',
		email: 'axmed@mail.ru',
		password: '777777',
		score: 3,
		games: 10000,
		wins: 100,
		image: default_image,
	},
	IEEE8776: {
		nickname: 'IEEE8776',
		email: 'axmed@mail.ru',
		password: '777777',
		score: 131,
		games: 10000,
		wins: 1,
		image: default_image,
	},
};
const ids = {};

const setHeadearListOnPage = {
	'Access-Control-Allow-Origin': 'https://front-wao.now.sh',
	'Access-Control-Allow-Credentials': 'true',
	'Access-Control-Allow-Headers': 'Content-Type,Origin',
	'Content-Security-Policy': "default-src 'self'",
};

const setHraderListAdditionInAppUse = {
	'Access-Control-Allow-Origin': 'https://wao2019.herokuapp.com/',
	'Access-Control-Allow-Origin': 'https://127.0.0.1:3000',
	'Access-Control-Allow-Methods': 'GET,PUT,POST,OPTIONS,DELETE',
};

app.use((req, res, next) => {
	if (req.method === 'OPTIONS') {
		console.log("OPTIONS");
		setHeaders(res, setHeadearListOnPage);
		setHeaders(res, setHraderListAdditionInAppUse);
		res.end();
		return;
	}
	next();
});

app.get('/api/v1/sessions', (req, res) => {
	console.log("sessions");
	const id = req.cookies.sessionid;
	console.log(id);
	if (!id) {
		return res.status(400).json({ error: 'Запрос без кук что ли?' });
	}

	console.log(ids);
	if (ids.hasOwnProperty(id)) {
		const nickname = ids[id];
		const send = {
			nickname: users[nickname].nickname,
			email: users[nickname].email,
			score: users[nickname].score,
			games: users[nickname].games,
			wins: users[nickname].wins,
			image: users[nickname].image,
		}
		//res.cookie('sessionid', id, { expires: new Date(Date.now() + 1000 * 60 * 10) });
		res.json(send);
	} else {
		return res.status(401).json({ error: 'Не авторизован' });
	}
});

app.delete('/api/v1/sessions', (req, res) => {  
	console.log("sessions");
	console.log(req.cookies.sessionid);
	const id = req.cookies.sessionid;
	if (Object.prototype.hasOwnProperty.call(ids, id)) {
		delete ids[id];
		req.session = null; // неверное и без этой строчки работать будет
		return res.status(200).json('Сессия закрыта');
	}
	return res.status(401);
});

function setHeaders(res, list) {
	for (const key in list) {
		if (list.hasOwnProperty(key)) {
			const element = list[key];
			res.header(key, element);
		}
	}
	return res;
}

app.post('/api/v1/signup', (req, res) => {
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
		return res.status(422).json({ error: 'Не валидные данные пользователя' });
	}
	if (users[nickname]) {
		return res.status(409).json({ error: 'Пользователь уже существует' });
	}

	let id = req.cookies.sessionid;
	if (!id) {
		id = uuid();
	}
	const user = { nickname, email, password, image, score: 0, games: 0, wins: 0 };
	console.log("User: ", user);
	ids[id] = nickname;
	users[nickname] = user;
	console.log("ids[id]: ", ids, "users[nickname]: ", users);

	res.cookie('sessionid', id, { expires: new Date(Date.now() + 1000 * 60 * 10) });
	res.status(201).json({ id });
});

app.post('/api/v1/signin', (req, res) => {
	console.log(req.body);
	const password = req.body.password;
	const nickname = req.body.nickname;
	if (!password || !nickname) {
		return res.status(422).json({ error: 'Не указан E-Mail или пароль' });
	}
	if (!users[nickname] || users[nickname].password !== password) {
		return res.status(422).json({ error: 'Не верный E-Mail и/или пароль' });
	}

	const id = uuid();
	ids[id] = nickname;

	res.cookie('sessionid', id, { expires: new Date(Date.now() + 1000 * 60 * 10) });
	res.status(200).json({ id });
});

app.get('/api/v1/user/:nickname', (req, res) => {
	const nickname = req.params.nickname;
	console.log('connect: ' + nickname);

	res = setHeaders(res, setHeadearListOnPage);
	const id = req.cookies['sessionid'];
	console.log("Give Id ", id);
	if (nickname !== ids[id]) {
		return res.status(422).json({error: 'Пользователь не найден'});
	}
	console.log("Give nickname ", nickname);
	if (!nickname || !users[nickname]) {
		return res.status(401).end();
	}

	// users[nickname].score += 1;
	const send = {
		nickname: users[nickname].nickname,
		email: users[nickname].email,
		score: users[nickname].score,
		games: users[nickname].games,
		wins: users[nickname].wins,
		image: users[nickname].image,
	}
	res.status(200).json(send);
});

app.put('/api/v1/user/:nickname', (req, res) => {
	const nickname = req.params.nickname;
	console.log('connect: ' + nickname);

	var form = new formidable.IncomingForm();
	form.parse(req);

	let user = {};

	form.on('field', function (name, value) {
		user[name] = value;
		console.log(name);
		console.log(value);
	});

	form.on('fileBegin', function (name, file) {
		file.path = path.resolve(__dirname, '..', 'dist', 'uploads', file.name);
	});

	form.on('file', function (name, file) {
		console.log('Uploaded ' + file.name);
		user.image = 'http://127.0.0.1:3000/uploads/' + file.name;
	});

	form.on('end', function() {
		console.log(user);
		users[user.nickname].nickname = user.nickname;
		users[user.nickname].email = user.email;
		users[user.nickname].password = user.password;
		if (user.image) {
			users[user.nickname].image = user.image;
		}
		console.log("Resp");
		const data = {
			nickname: user.nickname,
			email: users[user.nickname].email,
			score: users[user.nickname].score,
			wins: users[user.nickname].wins,
			games: users[user.nickname].games,
			image: users[user.nickname].image,
		}
		res.status(200).json(data);
	});

});

app.get('/api/v1/users', (req, res) => {
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
	res.status(200).json(scorelist);
});

app.get('/api/v1/users/:page', (req, res) => {
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
	// console.log(scorelist);	
	const page = parseInt(req.params.page);
	const limit = 10;	
	const offset = (page - 1) * limit;
	let end = scorelist.length;
	if (scorelist.length > offset + limit) {
		end = offset + limit;
	}

	const result = scorelist.slice(offset, end);

	res.status(200).json(result);
});


const port = process.env.PORT || 3000;
app.listen(port, () => {
	console.log(`Server listening port ${port}`);
});
