import Rect from '../../graphics/rect';

export default class FadingBlock extends Rect {
  constructor(ctx) {
    super(ctx);

    this.color = { r: 0, g: 0, b: 0 };

    this.x = 0;
    this.y = 0;
  }

  setColor(color) {
    this.color = {
      r: color.r || 15,
      g: color.g || 247,
      b: color.b || 77,
    };
  }

  getColor(code) {
    return this.color[code] || 0;
  }

  /**
   * @private
   */
  draw() {
    const { ctx } = this;
    ctx.beginPath();
    ctx.rect(-this.width / 2, -this.height, this.width, this.height);
    ctx.closePath();
    ctx.fill();
  }

  setup() {
    const { ctx } = this;

    ctx.translate(this.x, this.y);
    ctx.fillStyle = `rgb(${this.getColor('r')}, ${this.getColor(
      'g',
    )}, ${this.getColor('b')})`;
  }
}
