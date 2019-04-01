const baseUrl = 'http://127.0.0.1:3000';
const apiUrl = '/api/v1';
const reqUrl = baseUrl + apiUrl;

// добавить DELETE запросы

/**
 * Выполнить GET-запрос с помощью FetchAPI
 *@param {path} string
  *return {Promise}
  */
function getFetch(path = '/') {
  return fetch(reqUrl + path, {
    method: 'GET',
    mode: 'cors',
    credentials: 'include',
    body: null,
  });
}

/**
 * Выполнить POST-запрос с помощью FetchAPI
 *@param {path} string
  *@param {Object} body
  *return {Promise}
  */
function postFetch(path = '/', body = {}) {
  return fetch(reqUrl + path, {
    method: 'POST',
    mode: 'cors',
    credentials: 'include',
    body: JSON.stringify(body),
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  });
}

/**
 * Выполнить PUT-запрос с помощью FetchAPI
 *@param {path} string
  *@param {Object} body
  *return {Promise}
  */
function putFetch(path = '/', body) {
  return fetch(reqUrl + path, {
    method: 'PUT',
    mode: 'cors',
    credentials: 'include',
    body,
  });
}

/**
 * Проверить статус ответа
 *@param {Response} res
  *return {Promise<Response>}
  */
export function checkStatus(res) {
  if (res.status >= 200 && res.status <= 304) {
    return res;
  }
  const error = new Error(res.statusText);
  error.response = res;
  throw error;
}

/**
 * Распарсить тело ответа
 *@param {Response} res
  *return {Promise<Response>}
  */
export function parseJSON(res) {
  return res.json();
}

/**
 * Обертка над GET-запросом для получения сессии
 *return {Promise}
  */

export function getAuth() {
  return getFetch('/sessions');
}

/**
 * Обертка над GET-запросом для получения инфрормации о пользователе
 *@param {nickname} string
  *return {Promise}
  */
export function getUser(nickname) {
  return getFetch(`/users/${nickname}`);
}

/**
 * Обертка над GET-запросом для получения страницы таблицы лидеров
 *@param {page} int
  *return {Promise}
  */
export function getScoreBoard(page = 1) {
  return getFetch(`/users/${page.toString()}`);
}

/**
 * Обертка над POST-запросом для осуществления входа
 *@param {page} int
  *return {Promise}
  */
export function postSignIn(body = {}) {
  return postFetch('/signin', body);
}

/**
 * Обертка над POST-запросом для осуществления регистрации
 *@param {page} int
  *return {Promise}
  */
export function postSignUp(body = {}) {
  return postFetch('/signup', body);
}

/**
 * Обертка над PUT-запросом для обновления профиля
 *@param {nickname} String
  *@param {body} Object
  *return {Promise}
  */
export function putProfile(nickname, body = {}) {
  return putFetch(`/users/${nickname}`, body);
}
