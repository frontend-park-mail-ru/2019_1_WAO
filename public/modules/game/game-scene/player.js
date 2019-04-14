import Figure from '../../graphics/figure';
import Rect from '../../graphics/rect';
import Circle from '../../graphics/circle';

export default class GamePlayerFigure extends Figure {
  constructor(ctx) {
    super(ctx);

    this.body = new Rect(ctx);
    this.gun = new Circle(ctx);

    this.body.width = 50;
    this.body.height = 40;
    this.gun.radius = 5;
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

  // eslint-disable-next-line class-methods-use-this
  setup() {}
}
