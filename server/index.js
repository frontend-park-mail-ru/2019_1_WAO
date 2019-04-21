const fallback = require('express-history-api-fallback');
const express = require('express');
const body = require('body-parser');
const formidable = require('formidable');
const cookie = require('cookie-parser');
const fs = require('fs');
const uuid = require('uuid/v4');
const path = require('path');
const ws = require('express-ws');

const app = express();
/*
ws(app);
app.ws('/ws', (ws) => {
  setInterval(() => {
    ws.send('Hello there');
  }, 15000);
});
*/

app.use(express.static(path.resolve(__dirname, '..', 'dist')));
// app.use(express.static(path.resolve(__dirname, '..', 'dist', 'docs')));
// app.use(fallback('index.html', { root: 'dist' }));
app.use(body.json());
app.use(cookie());

const front_adress = 'http://127.0.0.1:3000';
// const front_adress = 'https://wao2019.herokuapp.com';
const back_adress = 'http://127.0.0.1:3000';
// const back_adress = 'https://waogame.herokuapp.com';
const default_image = `${back_adress}/uploads/user.png`;

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
  'Access-Control-Allow-Origin': front_adress,
  'Access-Control-Allow-Credentials': 'true',
  'Access-Control-Allow-Headers': 'Content-Type,Origin',
  'Content-Security-Policy': "default-src 'self'",
  'Access-Control-Allow-Methods': 'GET,PUT,POST,OPTIONS,DELETE',
};

function setHeaders(res, list) {
  for (const key in list) {
    if (list.hasOwnProperty(key)) {
      const element = list[key];
      res.header(key, element);
    }
  }
  return res;
}

app.use((req, res, next) => {
  if (req.method === 'OPTIONS') {
    console.log('OPTIONS');
    setHeaders(res, setHeadearListOnPage);
    res.end();
    return;
  }
  next();
});

const isAuth = (req, res) => {
  res = setHeaders(res, setHeadearListOnPage);
  console.log('session');
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
    };
    // res.cookie('sessionid', id, { expires: new Date(Date.now() + 1000 * 60 * 10) });
    res.json(send);
  } else {
    return res.status(401).json({ error: 'Не авторизован' });
  }
};

app.get('/api/session', (req, res) => isAuth(req, res));

app.delete('/api/signout', (req, res) => {
  res = setHeaders(res, setHeadearListOnPage);
  console.log('session');
  console.log(req.cookies.sessionid);
  const id = req.cookies.sessionid;
  if (Object.prototype.hasOwnProperty.call(ids, id)) {
    delete ids[id];
    req.session = null; // неверное и без этой строчки работать будет
    return res.status(200).json('Сессия закрыта');
  }
  return res.status(401);
});

app.post('/api/signup', (req, res) => {
  res = setHeaders(res, setHeadearListOnPage);
  const { nickname } = req.body;
  const { email } = req.body;
  const { password } = req.body;
  const image = default_image;

  console.log('This data was send: pass: ', password, 'nickname: ', nickname);
  if (
    !password
    || !nickname
    // ||
    //! password.match(/^\S{4,}$/) ||
    //! email.match(/@/) ||
    //! nick.match(/^\S{4,}$/)
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
  const user = {
    nickname,
    email,
    password,
    image,
    score: 0,
    games: 0,
    wins: 0,
  };
  console.log('User: ', user);
  ids[id] = nickname;
  users[nickname] = user;
  console.log('ids[id]: ', ids, 'users[nickname]: ', users);

  res.cookie('sessionid', id, {
    expires: new Date(Date.now() + 1000 * 60 * 10),
  });
  res.status(201).json(users[nickname]);
});

app.post('/api/signin', (req, res) => {
  res = setHeaders(res, setHeadearListOnPage);
  console.log(req.body);
  const { password } = req.body;
  const { nickname } = req.body;
  if (!password || !nickname) {
    return res.status(422).json({ error: 'Не указан E-Mail или пароль' });
  }
  if (!users[nickname] || users[nickname].password !== password) {
    return res.status(422).json({ error: 'Не верный E-Mail и/или пароль или нет кук' });
  }

  const id = uuid();
  ids[id] = nickname;

  res.cookie('sessionid', id, {
    expires: new Date(Date.now() + 1000 * 60 * 10),
  });
  res.status(200).json(users[nickname]);
});

app.get('/api/users/:nickname', (req, res) => {
  const { nickname } = req.params;
  console.log(`connect: ${nickname}`);

  res = setHeaders(res, setHeadearListOnPage);
  const id = req.cookies.sessionid;
  console.log('Give Id ', id);
  if (nickname !== ids[id]) {
    return res.status(422).json({ error: 'Пользователь не найден' });
  }
  console.log('Give nickname', nickname);
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
  };
  res.status(200).json(send);
});

app.put('/api/users/:nickname', (req, res) => {
  res = setHeaders(res, setHeadearListOnPage);
  const { nickname } = req.params;
  console.log(`connect: ${nickname}`);

  const form = new formidable.IncomingForm();
  form.parse(req);

  const user = {};

  form.on('field', (name, value) => {
    user[name] = value;
    console.log(name);
    console.log(value);
  });

  form.on('fileBegin', (name, file) => {
    file.path = path.resolve(__dirname, '..', 'dist', 'uploads', file.name);
  });

  form.on('file', (name, file) => {
    console.log(`Uploaded ${file.name}`);
    user.image = `${back_adress}/uploads/${file.name}`;
  });

  form.on('end', () => {
    console.log(user);
    users[user.nickname].nickname = user.nickname;
    users[user.nickname].email = user.email;
    if (user.password) {
      users[user.nickname].password = user.password;
    }
    if (user.image) {
      users[user.nickname].image = user.image;
    }
    console.log('Resp');
    const data = {
      nickname: user.nickname,
      email: users[user.nickname].email,
      score: users[user.nickname].score,
      wins: users[user.nickname].wins,
      games: users[user.nickname].games,
      image: users[user.nickname].image,
    };
    res.status(200).json(data);
  });
});

app.get('/api/users', (req, res) => {
  res = setHeaders(res, setHeadearListOnPage);
  const scorelist = Object.values(users)
    .sort((l, r) => r.score - l.score)
    .map(user => ({
      nickname: user.nickname,
      score: user.score,
      games: user.games,
      wins: user.wins,
    }));
  // console.log(scorelist);
  // const page = parseInt(req.params.page);
  // const limit = 10;
  const page = req.query.offset;
  const limit = req.query.limit;
  const pages = Math.ceil(scorelist.length / limit);
  const offset = (page - 1) * limit;
  let end = scorelist.length;
  if (scorelist.length > offset + limit) {
    end = offset + limit;
  }

  const result = scorelist.slice(offset, end);

  res.status(200).json({ pages, users: result });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening port ${port}`);
});
