import {
  baseUrl, getAuth, checkStatus, parseJSON, getUser,
} from './api';

/**
 * Данные о пользоваетеле
 */
const User = {
  nickname: 'New Player',
  email: 'Empty',
  score: 0,
  wins: 0,
  games: 0,
  // image: `${baseUrl}/uploads/user.png`,
  image: 'https://365psd.com/images/istock/previews/9353/93539553-flat-vector-avatar-face-character-person-portrait-user-icon.jpg',
  isAuth: false,
};

User.set = function set(data) {
  for (const param in data) {
    if (param && Object.prototype.hasOwnProperty.call(User, param)
    && Object.prototype.hasOwnProperty.call(data, param)) {
      User[param] = data[param];
    }
  }
};

User.reset = function reset() {
  User.nickname = 'New Player';
  User.email = 'Empty';
  User.score = 0;
  User.wins = 0;
  User.image = `${baseUrl}/uploads/user.png`;
  User.isAuth = false;
};

User.update = async function update() {
  try {
    const res = await getAuth();
    const status = await checkStatus(res);
    const nickname = await parseJSON(status);
    // const { nickname } = nickname0;
    console.log(`session ok for ${nickname}`);

    const res2 = await getUser(nickname);
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

export default User;
