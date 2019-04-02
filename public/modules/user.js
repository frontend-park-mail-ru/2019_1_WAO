
/**
 * Данные о пользоваетеле
 */
const User = {
  nickname: null,
  email: null,
  score: 0,
  wins: 0,
  games: 0,
  image: './images/default_image.png',
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
