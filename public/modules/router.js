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
    this.presenters = new Map();
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
    // this.presenters[path] = presenter;
    this.presenters.set(path, presenter);
  }

  /**
   * Открытие страницы
   * @param {string} path
   * @param {string} page Страница3
   * */
  route(path = '/', page = '') {
    if (!this.presenters.has(path)) {
      console.log('404');
      return;
    }

    if (this.presenters.has(this.prevPath)) {
      this.presenters.get(this.prevPath).stop();
    }

    this.prevPath = path;
    console.log(`route to ${path}`);

    if (window.location.pathname !== path) {
      Router.history(path + page);
    }

    this.presenters.get(path).call();
  }

  static history(path) {
    window.history.pushState(null, '', path);
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

    window.addEventListener('popstate', () => {
      const currentPath = window.location.pathname;
      this.route(currentPath);
    });
  }
}

export default new Router();
