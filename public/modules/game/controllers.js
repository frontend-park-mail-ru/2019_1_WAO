export default class GameControllers {
	constructor(root) {
		this.root = root;
		this.previous = {};
		this.keys = {};

		this._onPress = this._keyHandler.bind(this, 'press');
		this._onUp = this._keyHandler.bind(this, 'up');
	}

	/**
	 * Начинаем слушать события клавиатуры
	 */
	start() {
		document.addEventListener('keydown', this._onPress);
		document.addEventListener('keyup', this._onUp);
	}

	/**
	 * Прекращаем слушать события клавиатуры
	 */
	destroy() {
		document.removeEventListener('keydown', this._onPress);
		document.removeEventListener('keyup', this._onUp);
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
	_keyHandler(type, event) {
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
		console.log("Diff say: ", this.previous," ", this.keys);
		let allkeys = [];
		allkeys.push.apply(allkeys, Object.keys(this.previous));	// передает все предыдущие кнопки в allkeys
		allkeys.push.apply(allkeys, Object.keys(this.keys));	// передает все keys кнопки в allkeys
		allkeys = allkeys.map(k => k.toLowerCase());	// Приводим их к нижнему регистру
		allkeys = allkeys.filter((key, pos, all) => {
			return all.indexOf(key, pos + 1) === -1;	// Если элемента нет в массиве, то поместить индекс элемента в allkeys
		});

		const clicked = allkeys.reduce((res, key) => {
			res[key] = !this.previous[key] && this.keys[key];
			return res;
		}, {});

		this.previous = Object.assign({}, this.keys);
		return clicked;
	}
}