import { CanDrawShape } from './';
import { deg2Rad, makeGradient } from '../util';
import { ICircleShapeConfig } from '../types';

/**
 * 圆形/扇形
 *
 * draw circle or fan
 * @constructor
 * @memberOf CanDraw
 */
class Circle extends CanDrawShape {
  SHAPE_CONFIG: ICircleShapeConfig;
  constructor(config: ICircleShapeConfig) {
    super('CIRCLE');
    this.SHAPE_CONFIG = config;
  }

  // private _that = this;
  _drawShape() {
    const ctx = this._canvasCtx;
    const {
      x = 0,
      y = 0,
      radius,
      angle = 360,
      fill,
      stroke,
      strokeWidth = 1,
      clockwise = true,
      gradient,
      rotate = 0,
      dash,
      pathClosed = true,
      shadowBlur,
      shadowColor,
      shadowOffsetX,
      shadowOffsetY,
      opacity = 1,
    } = this.SHAPE_CONFIG;

    const resolvedGradient = makeGradient.call(this, gradient);
    const willFill = !!fill;
    const willStroke = !!stroke;
    const moreThan360 = angle >= 360;

    ctx.save();

    ctx.translate(x, y);
    ctx.rotate(deg2Rad(rotate));
    ctx.shadowBlur = shadowBlur as number;
    ctx.shadowColor = shadowColor as string;
    ctx.shadowOffsetX = shadowOffsetX as number;
    ctx.shadowOffsetY = shadowOffsetY as number;
    ctx.globalAlpha = opacity;

    if (willFill) {
      ctx.beginPath();
      // @ts-ignore
      ctx.fillStyle = resolvedGradient || fill;
      ctx.moveTo(0, 0);
      ctx.arc(0, 0, radius, 0, deg2Rad(angle), !clockwise);
      ctx.fill();
    }

    if (willStroke) {
      ctx.beginPath();
      // @ts-ignore
      ctx.strokeStyle = resolvedGradient || stroke;
      ctx.lineWidth = strokeWidth;
      pathClosed && !moreThan360 && ctx.moveTo(0, 0);
      !!dash && ctx.setLineDash(dash);
      ctx.arc(0, 0, radius, 0, deg2Rad(angle), !clockwise);
      pathClosed && ctx.closePath();
      ctx.stroke();
    }

    ctx.restore();
  }
}

export default Circle;
