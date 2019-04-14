export default class Figure {
  constructor(ctx) {
    this.ctx = ctx;
    this.x = 0;
    this.y = 0;
  }

  render() {
    this.ctx.save();
    this.setup();

    this.draw();

    this.ctx.restore();
  }

  /**
   * @abstract
   * @private
   */
  draw() {
    const { ctx } = this;
    ctx.rect(this.x, this.y, 50, 50);
  }

  // eslint-disable-next-line class-methods-use-this
  setup() {}
}
