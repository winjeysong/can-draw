import { CanDrawShape } from './';
import { deg2Rad, inherits, makeGradient } from '../util';
import { IRingShapeConfig } from '../types';

/**
 * 圆环/扇环
 * @param {number} config.x
 * @param {number} config.y
 * @param {number} config.innerRadius,
 * @param {number} config.outerRadius,
 * @param {number} config.angle
 * @param {string} config.fill
 * @param {string} config.stroke
 * @param {number} config.strokeWidth
 * @param {boolean} config.clockwise
 * @param config.gradient
 * @param {string} config.gradient.type "linear" | "radial"
 * @param {number[]} config.gradient.start [x0, y0, r0]
 * @param {number[]} config.gradient.end [x1, y1, r1]
 * @param {Array<{ offset: number, color: string}>} config.gradient.colorStops
 * @param {number} config.rotate
 * @param {number[]} config.dash
 * @param {number} config.shadowBlur,
 * @param {string} config.shadowColor,
 * @param {number} config.shadowOffsetX,
 * @param {number} config.shadowOffsetY,
 * @constructor
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
    ctx.shadowBlur = shadowBlur;
    ctx.shadowColor = shadowColor;
    ctx.shadowOffsetX = shadowOffsetX;
    ctx.shadowOffsetY = shadowOffsetY;
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
