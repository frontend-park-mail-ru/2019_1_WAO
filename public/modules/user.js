import { baseUrl } from './api';

/**
 * Данные о пользоваетеле
 */
const User = {
  nickname: 'New Player',
  email: 'Empty',
  score: 0,
  wins: 0,
  games: 0,
  image: `${baseUrl}/uploads/user.png`,
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

export default User;
