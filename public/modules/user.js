/**
 * Данные о пользоваетеле
 */
const User = {
  nickname: 'New Player',
  email: 'no mail',
  score: 0,
  wins: 0,
  games: 0,
  image: './uploads/user.png',
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

export default User;
