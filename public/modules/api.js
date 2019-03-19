import Ajax from './ajax.js';
const apiPath = '/api/v1';
const imgPath = '/data';

export default class ApiModule {

	/**
	 * Получить всю открытую информацию о пользователе
	 *@param {function} callback
	 *@param {String} nickname
	 *return пока ничего
	 */
	getUser(callback, nickname) {
		return Ajax.doGet({
			callback: callback,
			path: apiPath + '/users/' + nickname
		})
	}

	/**
	 * Получить всю картинку пользователя с сервера картинок
	 *@param {function} callback
	 *@param {String} nickname
	 */
	getImage(callback, nickname) {
		return Ajax.doGet({
			callback: callback,
			path: imgPath + nickname // запрос дожен идти на урл сервера картинок!! сейчас не так
		})
	}

	/**
	 * Получить инфу о игроках на одной странице
	 *@param {function} callback
	 *@param {int} page
	 */
	getScoreBoard(callback, page) {
		return Ajax.doGet({
			callback: callback,
			path: apiPath + '/users/' + page.toString()
		})
	}


	/**
	 * Логинимся
	 *@param {function} callback
	 *@param {String} nickname
	 *@param {String} password
	 */
	setSignIn(callback, nickname, password) {
		return Ajax.doPost({
			callback: callback,
			path: apiPath + '/signin',
			body: {
				nickname,
				password
			}
		})
	}


	/**
	 * Регистрируемся
	 *@param {function} callback
	 *@param {String} nickname
	 *@param {String} email
	 *@param {String} password
	 */
	setSignUp(callback, nickname, email, password) {
		return Ajax.doPost({
			callback: callback,
			path: apiPath + '/signup',
			body: {
				nickname,
				email,
				password
			}
		})
	}

	/**
	 * Регистрируемся
	 *@param {function} callback
	 *@param {String} nickname
	 *@param {String} email
	 *@param {String} password
	 *@param {file}   image
	 */
	setProfile(callback, nickname, email, password, image) {
		return Ajax.doPut({ // надо написать
			callback: callback,
			path: apiPath + '/users/' + nickname,
			body: {
				nickname,
				email,
				password,
				image
			}
		})
	}
}

const Api = new ApiModule();
export default Api;