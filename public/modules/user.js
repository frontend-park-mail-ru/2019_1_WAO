import {
  baseUrl, getAuth, checkStatus, parseJSON, getUser,
} from './api';

const imageDefaultPath = `${baseUrl}/uploads/user.png`;

/**
 * Данные о пользоваетеле
 */
const User = {
  nickname: 'Гость',
  email: 'У гостя нет почты',
  score: 0,
  wins: 0,
  games: 0,
  image: imageDefaultPath,
  isAuth: false,
};

User.set = function set(data) {
  for (const param in data) {
    if (
      param
      && Object.prototype.hasOwnProperty.call(User, param)
      && Object.prototype.hasOwnProperty.call(data, param)
    ) {
      User[param] = data[param];
    }
  }
};

User.reset = function reset() {
  User.nickname = 'Гость';
  User.email = 'У гостя нет почты';
  User.score = 0;
  User.wins = 0;
  User.image = imageDefaultPath;
  User.isAuth = false;
  // eslint-disable-next-line no-use-before-define
  setCookie('sessionid', '', {
    expires: -1,
  });
};

User.update = async function update() {
  try {
    const res = await getAuth();
    const status = await checkStatus(res);
    const nicknameObj = await parseJSON(status);
    // const { nickname } = nickname0;
    console.log(`session ok for ${nicknameObj.nickname}`);

    const res2 = await getUser(nicknameObj.nickname);
    const status2 = await checkStatus(res2);
    const data = await parseJSON(status2);
    console.log('get user ok');

    User.set(data);
    User.isAuth = true;
    console.log(User);
  } catch (err) {
    console.log(err);
    User.reset();
    console.log('reset');
  }
};

User.load = async function load() {
  try {
    if (!User.isAuth) {
      await User.update();
    }
  } catch (err) {
    console.log(err);
  }
};

function setCookie(name, value, options) {
  options = options || {};

  let { expires } = options;

  if (typeof expires === 'number' && expires) {
    const d = new Date();
    d.setTime(d.getTime() + expires * 1000);
    // eslint-disable-next-line no-multi-assign
    expires = options.expires = d;
  }
  if (expires && expires.toUTCString) {
    options.expires = expires.toUTCString();
  }

  value = encodeURIComponent(value);

  let updatedCookie = `${name}=${value}`;

  // eslint-disable-next-line guard-for-in
  for (const propName in options) {
    updatedCookie += `; ${propName}`;
    const propValue = options[propName];
    if (propValue !== true) {
      updatedCookie += `=${propValue}`;
    }
  }

  document.cookie = updatedCookie;
}

export default User;
