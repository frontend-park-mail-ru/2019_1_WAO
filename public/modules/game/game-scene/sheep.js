import Figure from '../../graphics/figure';

export default class Sheep extends Figure {
  constructor(ctx, pic) {
    super(ctx);
    this.rotation = 0;
    this.width = 50;
    this.height = 40;
    this.pic = pic;
  }

  /**
   * @private
   */
  draw() {
    const { ctx } = this;
    ctx.beginPath();
    ctx.drawImage(this.pic, -this.width, -this.height, this.width, this.height);
    ctx.closePath();
    ctx.fill();
  }

  setup() {
    const { ctx } = this;

    ctx.translate(this.x, this.y);
    // ctx.fillStyle = this.fillStyle;
  }
}
