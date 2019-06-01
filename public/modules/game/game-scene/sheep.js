import Figure from '../../graphics/figure';

export default class Sheep extends Figure {
  constructor(ctx, pic) {
    super(ctx);
    this.width = 50;
    this.height = 40;
    this.pic = pic;
    this.frameWidth = 500;
    this.frameHeight = 400;
    this.animationStep = 0;
    this.animationState = '';
  }

  /**
   * @private
   */
  draw() {
    const { ctx } = this;
    ctx.beginPath();
    ctx.drawImage(this.pic, this.animationStep * this.frameWidth, 0, this.frameWidth, this.frameHeight,
      -this.width, -this.height, this.width, this.height); // Основное описание картинки без смещения
      
    ctx.closePath();
    ctx.fill();
  }

  setup() {
    const { ctx } = this;

    ctx.translate(this.x, this.y);
    console.log("this.animationState: ", this.animationState);
    switch (this.animationState) {
      case 'jump':
        // console.log('jump');
        this.animationStep = 0;
        break;
      case 'fall':
        // console.log('fall');
        this.animationStep = 1;
        break;
      case 'left':
        // console.log('left');
        this.animationStep = 2;
        break;
      case 'right':
        // console.log('right');
        this.animationStep = 3;
        break;

      default:
        // console.log('default', this.animationState);
        this.animationStep = 1;
        break;
    }
  }
}
