/**
 * @module models/user
 */

/**
 * Модель пользователя.
 * @class UserModel
 */
class User {
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
    this.email = data.email;
    this.score = data.score;
    this.wins = data.wins;
    this.games = data.games;
    this.image = data.image || './images/default_image.png';
  }
}

export default new User();
