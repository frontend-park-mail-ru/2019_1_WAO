/* eslint-disable max-len */
export default class GameControllers {
  constructor(root) {
    this.root = root;
    this.previous = {};
    this.keys = {};

    this.onPress = this.keyHandler.bind(this, 'press');
    this.onUp = this.keyHandler.bind(this, 'up');
  }

  /**
   * Начинаем слушать события клавиатуры
   */
  start() {
    document.addEventListener('keydown', this.onPress);
    document.addEventListener('keyup', this.onUp);
  }

  /**
   * Прекращаем слушать события клавиатуры
   */
  destroy() {
    document.removeEventListener('keydown', this.onPress);
    document.removeEventListener('keyup', this.onUp);
  }

  /**
   * Нажата ли клавиша?
   * @param  {string}  key
   * @return {boolean}
   */
  is(key) {
    return this.keys[key];
  }

  /**
   * Обработчик события
   * @param  {string} type
   * @param  {MouseEvent} event
   */
  keyHandler(type, event) {
    this.keys[event.key.toLowerCase()] = type === 'press';
  }

  costumeControl() {
    return this.keys;
  }

  /**
   * Получить клавиши, нажатые с момента прошлого запроса
   * @returns {*}
   */
  diff() {
    console.log('Diff say: ', this.previous, ' ', this.keys);
    let allkeys = [];
    // allkeys.push.apply(allkeys, Object.keys(this.previous)); // передает все предыдущие кнопки в allkeys
    // allkeys.push.apply(allkeys, Object.keys(this.keys)); // передает все keys кнопки в allkeys
    allkeys.push(...Object.keys(this.previous)); // передает все предыдущие кнопки в allkeys
    allkeys.push(...Object.keys(this.keys)); // передает все keys кнопки в allkeys
    allkeys = allkeys.map(k => k.toLowerCase()); // Приводим их к нижнему регистру
    allkeys = allkeys.filter((key, pos, all) => all.indexOf(key, pos + 1) === -1); // Если элемента нет в массиве, то поместить индекс элемента в allkeys

    const clicked = allkeys.reduce((res, key) => {
      res[key] = !this.previous[key] && this.keys[key];
      return res;
    }, {});

    this.previous = Object.assign({}, this.keys);
    return clicked;
  }
}
