/**
 * @module models/user
 */

import Ajax from './ajax.js';

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
			nickname: 	this.nickname,
			email: 		this.email,
			score: 		this.score,
			wins: 		this.wins,
			games: 		this.games,
			image: 		this.image,
		}
	}

    /**
     * Заполняем поля пользователя
     * @param {Object} data
     */
	set(data) {
		this.nickname 	= data.nickname;
		this.email	 	= data.email;
		this.score 		= data.score;
		this.wins 		= data.wins;
		this.games 		= data.games;	
		this.image 		= data.image || './images/default_image.png';
	}

	// это дело в сеть
	update() { 
		Ajax.doGet({
			callback(xhr) {
				if (xhr.status === 200 || xhr.status === 304) {
					User.set(JSON.parse(xhr.responseText));
					console.log(User.get());
				}
			},
			path: '/sessions',
		});
	}
}

const User = new UserModel();
export default User;