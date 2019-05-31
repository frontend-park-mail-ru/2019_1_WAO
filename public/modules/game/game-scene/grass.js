import Figure from '../../graphics/figure';

export default class Grass extends Figure {
  constructor(ctx, pic) {
    super(ctx);
    this.width = 90;
    this.height = 15;
    this.pic = pic;
  }

  /**
   * @private
   */
  draw() {
    const { ctx } = this;
    ctx.beginPath();
    ctx.drawImage(this.pic, this.animationStep * this.width, 0, this.width, this.height,
      -this.width, -this.height, this.width, this.height); // Основное описание картинки без смещения
      
    ctx.closePath();
    ctx.fill();
  }

  setup() {
    const { ctx } = this;

    ctx.translate(this.x, this.y);
    
    // switch (this.animationState) {
    //   case 'droped':
    //     this.animationStep = 1;
    //     break;
    
    //   default:
    //     this.animationStep = 0;
    //     break;
    // }
  }
}
