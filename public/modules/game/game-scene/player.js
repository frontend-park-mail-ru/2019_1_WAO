import Figure from '../../graphics/figure';
import Rect from '../../graphics/rect';
import Circle from '../../graphics/circle';

export default class GamePlayerFigure extends Figure {
  constructor(ctx) {
    super(ctx);

    this.body = new Rect(ctx);
    // this.gun = new Circle(ctx);
    this.body.fillStyle = 'rgb(101, 168, 25)';
    this.body.width = 50;
    this.body.height = 40;
    // this.gun.radius = 5;
    this.mass = 1;
  }

  /**
   * @private
   */
  draw() {
    // const { ctx } = this;
    this.body.x = this.x;
    this.body.y = this.y;
    // this.gun.x = this.x;
    // this.gun.y = this.y - this.body.height / 2;

    this.body.render();
    // this.gun.render();
  }

  setColor(color) {
    const { ctx } = this;
    ctx.fillStyle = color;
  }

  // eslint-disable-next-line class-methods-use-this
  setup() {
    
  }
}
