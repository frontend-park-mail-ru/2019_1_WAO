'use strict';

const express = require('express');
const body = require('body-parser');
//const cookie = require('cookie-parser');
// morgan = require('morgan');
//const uuid = require('uuid/v4');
//const path = require('path');
const app = express();


//app.use(morgan('dev'));
//app.use(express.static(path.resolve(__dirname, '..', 'public')));
app.use(express.static('./public'));

const port = process.env.PORT || 3000;
app.listen(port, function () {
	console.log(`Server listening port ${port}`);
});
