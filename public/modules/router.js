import EventBus from './eventbus.js';

/**
 * RouterModel view
 * @class RouterModel
 */
class RouterModule {
  constructor({
    root = document.body,
  } = {}) {
    this._root  = root;
    this._views = {};
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
   * @param {string} view
   * */
  addView(path, view) {
    this._views[path] = view;
  }

  /**
   * Срабатывание на событие
   * @param {string} path
   * */
  route(path = '/') {
    if (!this._paths.hasOwnProperty(path)) {
      // открыть свою 404 либо вызвать уведомление
    }

    if (!this._paths.hasOwnProperty(this._prevPath)) {
      this._views[this._prevPath].hide();
    }
    this._prevPath = path;

    if (!this._views[path].rendered()) {
      this._views[path].render(this._root)
    }
    this._views[path].show();

    _set
    _history();
  }

  _history() {
     window.history.pushState(null, null, path);
  }

  listen() {
    this._root.addEventListener('click', function(event) {
      if (!(event.target instanceof HTMLAnchorElement)) {
        return;
      }
      event.preventDefault();
      const link = event.target;
      this.route(link.dataset.href);
    }).bind(this);
  }
}

const Router = new RouterModule();
export default Router;
