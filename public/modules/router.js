// import EventBus from './eventbus';

/**
 * RouterModel presenter
 * @class RouterModel
 */
class Router {
  constructor({
    root = document.body,
  } = {}) {
    this.root = root;
    this.presenters = {};
    this.prevPath = null;
  }

  /**
   * Изменить root
   * @param {string} root
   * */
  setRoot(root) {
    this.root = root;
  }

  /**
   * Добавление элемента
   * @param {string} path
   * @param {string} presenter
   * */
  add(path, presenter) {
    this.presenters[path] = presenter;
  }

  /**
   * Открытие страницы
   * @param {string} path
   * */
  route(path = '/', page = '') {
    if (!Object.prototype.hasOwnProperty.call(this.presenters, path)) {
      // открыть свою 404 либо вызвать уведомление
      console.log('404');
      return;
    }

    if (Object.prototype.hasOwnProperty.call(this.presenters, this.prevPath)) {
      this.presenters[this.prevPath].view.hide();
    }
    this.prevPath = path;
    console.log(`route to ${path}`);
    this.presenters[path].view.show();

    Router.history(path + page);
  }

  static history(path) {
    console.log('To history: ', path);
    window.history.pushState(null, null, path);
  }


  listen() {
    this.root.addEventListener('click', (event) => {
      if (!(event.target instanceof HTMLAnchorElement)) {
        return;
      }
      event.preventDefault();
      console.log(event.target.dataset.href);
      this.route(event.target.dataset.href);
    });
  }
}

export default new Router();
