'use strict';

const express = require('express');
const body = require('body-parser');
const cookie = require('cookie-parser');
// morgan = require('morgan');
const uuid = require('uuid/v4');
//const path = require('path');
const app = express();


//app.use(morgan('dev'));
//app.use(express.static(path.resolve(__dirname, '..', 'public')));
app.use(express.static('./public'));


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

const port = process.env.PORT || 3000;
app.listen(port, function () {
	console.log(`Server listening port ${port}`);
});