/**
 * Проверяет коректность ника
 * @param {String} nickname
 * @param {Array<String>} errList
 */
export function isCorrectNickname(nickname = '') {
  if (nickname.length < 4) {
    return { status: false, err: 'Не короче 4 символов' };
  }
  if (!nickname.match(/^\w+$/)) {
    return { status: false, err: 'Латиницей' };
  }
  return { status: true, err: '' };
}

/**
 * Проверяет коректность почты
 * @param {String} email
 * @param {Array<String>} errList
 */
export function isCorrectEmail(email = '') {
  if (
    !email.match(
      /^([a-z0-9_\\-]+\.)*[a-z0-9_\\-]+@([a-z0-9][a-z0-9\\-]*[a-z0-9]\.)+[a-z]{2,4}$/i,
    )
  ) {
    return { status: false, err: 'Некорректная почта' };
  }
  return { status: true, err: '' };
}

/**
 * Проверяет коректность пароля
 * @param {String} password1 Пароль
 * @param {String} password2 И его повторение
 * @param {Array<String>} errList
 */
export function isCorrectPassword(password1 = '', password2 = '') {
  if (password1 !== password2) {
    return { status: false, err: 'Пароли не совпадают' };
  }

  if (password1.length < 6) {
    return { status: false, err: 'Не короче 6 символов' };
  }
  return { status: true, err: '' };
}
