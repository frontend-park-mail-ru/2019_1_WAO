/* eslint-disable max-len */
import { gameBus } from '../eventbus';

export default class GameControllers {
  constructor(root) {
    this.root = root;
    this.previous = {};
    this.keys = {};
    this.controllersLoopIntervalId = null;

    this.onPress = this.keyHandler.bind(this, 'press');
    this.onUp = this.keyHandler.bind(this, 'up');
  }

  /**
   * Начинаем слушать события клавиатуры
   */
  start() {
    // let initialPoint;
    // let finalPoint;
    // document.addEventListener('touchstart', (event) => {
    //   event.preventDefault();
    //   event.stopPropagation();
    //   initialPoint = event.changedTouches[0];
    // }, false);
    // document.addEventListener('touchend', (event) => {
    //   event.preventDefault();
    //   event.stopPropagation();
    //   finalPoint = event.changedTouches[0];
    //   const xAbs = Math.abs(initialPoint.pageX - finalPoint.pageX);
    //   const yAbs = Math.abs(initialPoint.pageY - finalPoint.pageY);
    //   if (xAbs > 20 || yAbs > 20) {
    //     if (xAbs > yAbs) {
    //       if (finalPoint.pageX < initialPoint.pageX) {
    //         /* СВАЙП ВЛЕВО */ }           else {
    //         /* СВАЙП ВПРАВО */ }
    //     }
    //   }
    // }, false);
    document.addEventListener('keydown', this.onPress);
    document.addEventListener('keyup', this.onUp);
    const [canvas] = document.getElementsByClassName('game-view__canvas');
    canvas.addEventListener('touchstart', this.touchLoop);
    canvas.addEventListener('touchend', this.touchLoopEnd);
  }

  touchLoopEnd() {
    clearInterval(this.controllersLoopIntervalId);
  }

  touchLoop(event) {
    // console.log(event);
    this.controllersLoopIntervalId = setInterval(() => {
      if (event.touches[0].pageX < window.innerWidth / 2) {
        gameBus.trigger('left_pressed', {
          arrowleft: true,
          arrowright: false,
        });
      } else {
        gameBus.trigger('right_pressed', {
          arrowleft: false,
          arrowright: true,
        });
      }
    }, 10);
  }

  /**
   * Прекращаем слушать события клавиатуры
   */
  destroy() {
    // document.removeEventListener('touchstart');
    // document.removeEventListener('touchend');
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
    // console.log('Diff say: ', this.previous, ' ', this.keys);
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
