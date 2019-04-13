// import EventBus from './eventbus';

/**
 * Роутер. Переключавет страницы
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
   * @param {Presenter} presenter Представитель элемента
   * */
  add(path, presenter) {
    this.presenters[path] = presenter;
  }

  /**
   * Открытие страницы
   * @param {string} path
   * @param {string} page Страница3
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
    this.presenters[path].call();

    Router.history(path + page);
  }

  static history(path) {
    window.history.pushState(null, null, path);
  }

  static changeUrl(path) {
    window.history.replaceState(null, null, path);
  }

  /**
   * Ловим переходы по страницам
   * */
  listen() {
    this.root.addEventListener('click', (event) => {
      if (!(event.target instanceof HTMLAnchorElement)) {
        return;
      }
      if (event.target.dataset.href === '#') {
        return;
      }
      event.preventDefault();
      this.route(event.target.dataset.href);
    });

    window.addEventListener('popstate', function () {
			const currentPath = window.location.pathname;
			this.route(currentPath);
		}.bind(this));
  }
}

export default new Router();
