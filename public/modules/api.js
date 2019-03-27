const baseUrl = 'http://127.0.0.1:3000';
const apiUrl = '/api/v1';
const reqUrl = baseUrl + apiUrl;

export default class Api {
	
	// добавить PUT и DELETE запросы
	// добавить походы за картинками

	/**
	 * Выполнить GET-запрос с помощью FetchAPI
	 *@param {path} string
	 *return {Promise}
	 */
	static _getFetch(path = '/') {
		return fetch(reqUrl + path, {
			method: 'GET',
			mode: 'cors',
			credentials: 'include',
			body: null,
		})		
	}

	/**
	 * Выполнить POST-запрос с помощью FetchAPI
	 *@param {path} string
	 *@param {Object} body
	 *return {Promise}
	 */
	static _postFetch(path = '/', body = {}) {
		return fetch(reqUrl + path, {
			method: 'POST',
			mode: 'cors',
			credentials: 'include',
			body: JSON.stringify(body),
			headers: {'Content-Type': 'application/json; charset=utf-8'}
		})		
	}

	/**
	 * Выполнить PUT-запрос с помощью FetchAPI
	 *@param {path} string
	 *@param {Object} body
	 *return {Promise}
	 */
	static _putFetch(path = '/', body) {
		return fetch(reqUrl + path, {
			method: 'PUT',
			mode: 'cors',
			credentials: 'include',
			body: body,
			//headers: {'Content-Type': 'multipart/form-data; boundary=boundary'}
		})		
	}
	/**
	 * Обертка над GET-запросом для получения сессии
	 *return {Promise}
	 */
	static getAuth() {
		return this._getFetch('/sessions');
	}


	/**
	 * Обертка над GET-запросом для получения инфрормации о пользователе
	 *@param {nickname} string
	 *return {Promise}
	 */
	static getUser(nickname) {
		return this._getFetch('/users/' + nickname);
	}

	/**
	 * Обертка над GET-запросом для получения страницы таблицы лидеров
	 *@param {page} int
	 *return {Promise}
	 */
	static getScoreBoard(page) {
		return this._getFetch('/users/' + page.toString());
	}

	/**
	 * Обертка над POST-запросом для осуществления входа
	 *@param {page} int
	 *return {Promise}
	 */
	static postSignIn(body = {}) {
		return this._postFetch('/signin', body);
	}

	/**
	 * Обертка над POST-запросом для осуществления регистрации
	 *@param {page} int
	 *return {Promise}
	 */
	static postSignUp(body = {}) {
		return this._postFetch('/signup', body);
	}

	/**
	 * Обертка над PUT-запросом для обновления профиля
	 *@param {nickname} String
	 *@param {body} Object
	 *return {Promise}
	 */
	static putProfile(nickname, body = {}) {
		return this._putFetch('/users/' + nickname, body);
	}

}