import Figure from '../../graphics/figure';

export default class Grass extends Figure {
  constructor(ctx, pic) {
    super(ctx);
    this.width = 90;
    this.height = 15;
    this.pic = pic;
    this.frameWidth = 0;
    this.frameHeight = 0;
  }

  /**
   * @private
   */
  draw() {
    const { ctx } = this;
    ctx.beginPath();
    console.log(this.pic.width, this.pic.height, this.pic.naturalWidth, this.pic.naturalHeight);
    ctx.drawImage(this.pic, /*this.animationStep * this.width*/0, 0, this.pic.naturalWidth, this.pic.naturalHeight,
      -this.width/2, -this.height, this.width, this.height); // Основное описание картинки без смещения
      
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
