export default class Scene {
	constructor(ctx) {
		this.ctx = ctx;
		this.frontView = [];
		this.backView = [];
		this.figures = {};

		this._id = 0;
	}

	ID() {
		return `#${this._id++}`;
	}

	push(figure) {
		const id = this.ID();
		this.figures[id] = figure;
		this.frontView.push(figure);

		return id;
	}

	toFront(id) {
		const figure = this.figures[id];
		this.backView = this.backView.filter(function (item) {
			return item !== figure;
		});
		this.frontView = this.frontView.filter(function (item) {
			return item !== figure;
		});
		this.frontView.push(figure);
	}

	toBack(id) {
		const figure = this.figures[id];
		this.backView = this.backView.filter(function (item) {
			return item !== figure;
		});
		this.frontView = this.frontView.filter(function (item) {
			return item !== figure;
		});
		this.backView.push(figure);
	}

	remove(id) {
		const figure = this.figures[id];
		this.backView = this.backView.filter(function (item) {
			return item !== figure;
		});
		this.frontView = this.frontView.filter(function (item) {
			return item !== figure;
		});

		delete this.figures[id];
		if (Object.keys(this.figures).length === 0) {
			console.info('Scene is empty!');
		}
	}

	render() {
		const ctx = this.ctx;
		ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
		this.backView.forEach(figure => figure.render());
		this.frontView.forEach(figure => figure.render());
	}

	clear() {
		const ctx = this.ctx;
		ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
	}
}
