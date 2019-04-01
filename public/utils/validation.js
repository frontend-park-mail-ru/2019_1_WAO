/**
 * Проверяет коректность ника
 * @param {String} nickname
 * @param {Array<String>} errList
 */
function isCorrectNickname(nickname = '', errList = ['']) {
  if (nickname.length < 6) {
    errList.push('Длина никнейма должна быть не менне 6 символов');
  }
  if (!nickname.match(/^\w+$/)) {
    errList.push('Используйте латинские буквы');
  }
  // return errList;
}

/**
 * Проверяет коректность почты
 * @param {String} email
 * @param {Array<String>} errList
 */
function isCorrectEmail(email = '', errList = ['']) {
  if (!email.match(/^([a-z0-9_\\-]+\.)*[a-z0-9_\\-]+@([a-z0-9][a-z0-9\\-]*[a-z0-9]\.)+[a-z]{2,4}$/i)) {
    errList.push('Введите email корректно');
  }
  // return errList;
}

/**
 * Проверяет коректность пароля
 * @param {String} password1 Пароль
 * @param {String} password2 И его повторение
 * @param {Array<String>} errList
 */
function isCorrectPassword(password1 = '', password2 = '', errList = ['']) {
  if (password1 !== password2) {
    errList.push('Пароли не совпадают');
  }

  if (password1.length < 6) {
    errList.push('Пароль должен быть не короче 6 символов');
  }
  // return errList;
}

/**
 * Проверяет валидность Ник-Пароль
 * @param {String} nickname
 * @param {String} password
 * @param {Array<String>} errList
 */
export function checkValidationNP(nickname, password) {
  const errList = [];
  isCorrectNickname(nickname, errList);
  isCorrectPassword(password, password, errList);

  if (errList.length > 0) {
    alert(errList);
    return false;
  }
  return true;
}

/**
 * Проверяет валидность Ник-Почта-Пароль
 * @param {String} nickname
 * @param {String} password
 * @param {Array<String>} errList
 */
export function checkValidationNEP(nickname, email, password1, password2) {
  const errList = [];
  isCorrectNickname(nickname, errList);
  isCorrectEmail(email, errList);
  isCorrectPassword(password1, password2, errList);

  if (errList.length > 0) {
    alert(errList);
    return false;
  }
  return true;
}
