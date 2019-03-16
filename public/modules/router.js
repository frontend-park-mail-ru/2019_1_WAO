class RouterModel {
	constructor({
		_el = document.body,
	} = {}) {
		this._el = el;
		this._paths = {};
	}

	addView(path, view) {
		this._paths[path] = view;
	}

	route(path) {
		if (this._paths.hasOwnProperty(path)) {
			this._paths[path].create()
		} else {
			// открыть свою 404 либо вызвать уведомление
		}
	}

	listen() {
		this._el.addEventListener('click', function(event) {
			if (!(event.target instanceof HTMLAnchorElement)) {
				return;
			}
			event.preventDefault();
			const link = event.target;
			this.route(link.dataset.href);
		}).bind(this);
	}
}

const Router = new RouterModel();
export default Router;