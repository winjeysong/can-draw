import { CanDrawShape } from './';
import { deg2Rad, makeGradient } from '../util';
import { IRingShapeConfig } from '../types';

/**
 * 圆环/扇环
 *
 * draw ring or section ring
 * @constructor
 * @memberOf CanDraw
 */
class Ring extends CanDrawShape {
  SHAPE_CONFIG: IRingShapeConfig;
  constructor(config: IRingShapeConfig) {
    super('RING');
    this.SHAPE_CONFIG = config;
  }

  _drawShape() {
    const ctx = this._canvasCtx;
    const {
      x = 0,
      y = 0,
      innerRadius,
      outerRadius,
      angle = 360,
      fill,
      stroke,
      strokeWidth = 1,
      clockwise = true,
      gradient,
      rotate = 0,
      dash,
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
      ctx.moveTo(innerRadius, 0);
      ctx.arc(0, 0, innerRadius, 0, deg2Rad(angle), !clockwise);
      ctx.lineTo(innerRadius * Math.cos(deg2Rad(angle)), innerRadius * Math.sin(deg2Rad(angle)));
      moreThan360
        ? ctx.moveTo(outerRadius * Math.cos(deg2Rad(angle)), outerRadius * Math.sin(deg2Rad(angle)))
        : ctx.lineTo(
            outerRadius * Math.cos(deg2Rad(angle)),
            outerRadius * Math.sin(deg2Rad(angle)),
          );
      ctx.arc(0, 0, outerRadius, deg2Rad(angle), 0, clockwise);
      ctx.closePath();
      ctx.fill();
    }

    if (willStroke) {
      // @ts-ignore
      ctx.strokeStyle = resolvedGradient || stroke;
      ctx.lineWidth = strokeWidth;
      !!dash && ctx.setLineDash(dash);
      ctx.stroke();
    }

    ctx.restore();
  }
}

export default Ring;
