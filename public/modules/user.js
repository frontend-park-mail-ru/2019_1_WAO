/**
 * @module models/user
 */

// import Api from './api.js';

/**
 * UserModel user
 * @class UserModel
 */
class UserModel {
  constructor() {
    this.nickname 	= null;
    this.email	 	= null;
    this.score 		= null;
    this.wins 		= null;
    this.games 		= null;
    this.image		= null;
  }

  /**
     * Получаем данные пользователя
     * @return {Object} data
     */
  get() {
    return {
      nickname: this.nickname,
      email: this.email,
      score: this.score,
      wins: this.wins,
      games: this.games,
      image: this.image,
    };
  }

  /**
     * Заполняем поля пользователя
     * @param {Object} data
     */
  set(data) {
    this.nickname = data.nickname;
    this.email	 	= data.email;
    this.score 		= data.score;
    this.wins 		= data.wins;
    this.games 		= data.games;
    this.image 		= data.image || './images/default_image.png';
  }

  /**
     * Сброс полей пользователя
     */
  reset() {
    this.nickname = null;
    this.email    = null;
    this.score    = null;
    this.wins     = null;
    this.games    = null;
    this.image    = null;
  }

/*
  update() {
    Api.getAuth()
      .then((res) => {
        if (res.status == 200 || res.status == 304) {
          res.json().then((user) => {
            User.set(user);
            console.log(User.get());
          });
        }
      });
  }
*/
}
const User = new UserModel();
export default User;
