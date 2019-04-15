import Figure from './figure';

export default class Rect extends Figure {
  constructor(ctx) {
    super(ctx);
    this.rotation = 0;
    this.width = 0;
    this.height = 0;
    this.fillStyle = 'black';
  }

  rotate(degrees) {
    this.rotation = (degrees * Math.PI) / 180;
  }

  /**
   * @private
   */
  draw() {
    const { ctx } = this;
    ctx.beginPath();
    ctx.rect(-this.width, -this.height, this.width, this.height);

    ctx.closePath();
    ctx.fill();
  }

  setup() {
    const { ctx } = this;

    ctx.translate(this.x, this.y);
    ctx.rotate(this.rotation);
    ctx.fillStyle = this.fillStyle;
  }
}
