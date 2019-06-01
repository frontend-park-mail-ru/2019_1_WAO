import Figure from '../../graphics/figure';

export default class Sheep extends Figure {
  constructor(ctx, pic) {
    super(ctx);
    this.width = 50;
    this.height = 40;
    this.pic = pic;
    this.frameWidth = 500;
    this.frameHeight = 0;
  }

  /**
   * @private
   */
  draw() {
    const { ctx } = this;
    ctx.beginPath();
    ctx.drawImage(this.pic, this.animationStep * this.frameWidth, 0, this.pic.naturalWidth, this.pic.naturalHeight,
      -this.width, -this.height, this.width, this.height); // Основное описание картинки без смещения
      
    ctx.closePath();
    ctx.fill();
  }

  setup() {
    const { ctx } = this;

    ctx.translate(this.x, this.y);

    switch (this.animationState) {
      case 'jump':
        this.animationStep = 0;
        break;
      case 'fall':
        this.animationStep = 1;
        break;
      case 'left':
        this.animationStep = 2;
        break;
      case 'right':
        this.animationStep = 3;
        break;

      default:
        this.animationStep = 0;
        break;
    }
  }
}
