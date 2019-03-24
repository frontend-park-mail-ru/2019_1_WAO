import EventBus from './eventbus.js';

/**
 * RouterModel presenter
 * @class RouterModel
 */
class RouterModule {
  constructor({
    root = document.body,
  } = {}) {
    this._root  = root;
    this._presenters = {};
    this._prevPath = null;
  }

  /**
   * Изменить root
   * @param {string} root
   * */
  setRoot(root) {
    this._root  = root;
  }

  /**
   * Срабатывание на событие
   * @param {string} path
   * @param {string} presenter
   * */
  add(path, presenter) {
    this._presenters[path] = presenter;
  }

  /**
   * Срабатывание на событие
   * @param {string} path
   * */
  route(path = '/') {
    if (!this._presenters.hasOwnProperty(path)) {
      // открыть свою 404 либо вызвать уведомление
      console.log('404');
      return;
    }

    if (this._presenters.hasOwnProperty(this._prevPath)) {
      this._presenters[this._prevPath].view.hide();
    }
    this._prevPath = path;

    if (!this._presenters[path].view.rendered()) {
      this._presenters[path].view.render(this._root);
    }
    this._presenters[path].view.show();

    this._history(path);
  }

  _history(path) {
     window.history.pushState(null, null, path);
  }

  listen() {
    this._root.addEventListener('click', (event) => {
      if (!(event.target instanceof HTMLAnchorElement)) {
        return;
      }
      event.preventDefault();
      console.log(event.target.dataset.href);
      this.route(event.target.dataset.href);
    });
  }
}

const Router = new RouterModule();
export default Router;
