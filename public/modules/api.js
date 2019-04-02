const baseUrl = 'http://127.0.0.1:3000';
const apiUrl = '/api/v1';
const reqUrl = baseUrl + apiUrl;

/**
 * Выполнить GET-запрос с помощью FetchAPI
 * @param {string} path
 * return {Promise<Responce>}
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
 * Выполнить DELETE-запрос с помощью FetchAPI
 * @param {string} path
 * return {Promise<Responce>}
 */
function delFetch(path = '/') {
  return fetch(reqUrl + path, {
    method: 'DELETE',
    mode: 'cors',
    credentials: 'include',
    body: null,
  });
}

/**
 * Выполнить POST-запрос с помощью FetchAPI
 * @param {path} string
 * @param {Object} body Тело запроса
 * return {Promise<Responce>}
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
 * @param {path} string
 * @param {Object} body Тело запроса
 * return {Promise<Responce>}
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
 * @param {Promise<Responce>} res
 * return {Promise<Responce>}
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
 * @param {Promise<Responce>} res
 * return {Promise<Object>}
 */
export function parseJSON(res) {
  return res.json();
}

/**
 * Обертка над GET-запросом для получения сессии
 * return {Promise<Responce>}
 */
export function getAuth() {
  return getFetch('/sessions');
}

/**
 * Обертка над DELETE-запросом для закрытия сессии
 * return {Promise<Responce>}
 */
export function delAuth() {
  return delFetch('/sessions');
}

/**
 * Обертка над GET-запросом для получения инфрормации о пользователе
 * @param {nickname} string Никнэйм пользователя
 * return {Promise<Responce>}
 */
export function getUser(nickname) {
  return getFetch(`/users/${nickname}`);
}

/**
 * Обертка над GET-запросом для получения страницы таблицы лидеров
 * @param {page} int Номер страницы в таблице лидеров
 * return {Promise<Responce>}
 */
export function getScoreBoard(page = 1) {
  return getFetch(`/users/${page.toString()}`);
}

/**
 * Обертка над POST-запросом для осуществления входа
 * @param {Object} body Тело запроса для Входа
 * return {Promise<Responce>}
 */
export function postSignIn(body = {}) {
  return postFetch('/signin', body);
}

/**
 * Обертка над POST-запросом для осуществления регистрации
 * @param {Object} body Тело запроса для Регистрации
 * return {Promise<Responce>}
 */
export function postSignUp(body = {}) {
  return postFetch('/signup', body);
}

/**
 * Обертка над PUT-запросом для обновления профиля
 * @param {nickname} String Никнэйм пользователя
 * @param {body} Object Тело запроса для обновления данных
 * return {Promise<Responce>}
 */
export function putProfile(nickname, body = {}) {
  return putFetch(`/users/${nickname}`, body);
}
