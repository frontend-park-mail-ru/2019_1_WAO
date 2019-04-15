export default class Scene {
  constructor(ctx) {
    this.ctx = ctx;
    this.frontView = [];
    this.backView = [];
    this.figures = {};

    this.id = 0;
  }

  ID() {
    this.id += 1;
    return `#${this.id}`;
  }

  push(figure) {
    const id = this.ID();
    this.figures[id] = figure;
    this.frontView.push(figure);

    return id;
  }

  toFront(id) {
    const figure = this.figures[id];
    this.backView = this.backView.filter(item => item !== figure);
    this.frontView = this.frontView.filter(item => item !== figure);
    this.frontView.push(figure);
  }

  toBack(id) {
    const figure = this.figures[id];
    this.backView = this.backView.filter(item => item !== figure);
    this.frontView = this.frontView.filter(item => item !== figure);
    this.backView.push(figure);
  }

  remove(id) {
    const figure = this.figures[id];
    this.backView = this.backView.filter(item => item !== figure);
    this.frontView = this.frontView.filter(item => item !== figure);

    delete this.figures[id];
    if (Object.keys(this.figures).length === 0) {
      console.info('Scene is empty!');
    }
  }

  render() {
    const { ctx } = this;
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    this.backView.forEach(figure => figure.render());
    this.frontView.forEach(figure => figure.render());
  }

  clear() {
    const { ctx } = this;
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  }
}
