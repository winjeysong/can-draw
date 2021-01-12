import { CanDrawShape } from './';
import { deg2Rad, inherits, makeGradient } from '../util';
import { Coords, ICircleShapeConfig } from '../types';

/**
 * 圆形/扇形
 * @param {number} config.x
 * @param {number} config.y
 * @param {number} config.radius
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
 * @param {boolean} config.pathClosed
 * @param {number} config.shadowBlur,
 * @param {string} config.shadowColor,
 * @param {number} config.shadowOffsetX,
 * @param {number} config.shadowOffsetY,
 * @constructor
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
    ctx.shadowBlur = shadowBlur;
    ctx.shadowColor = shadowColor;
    ctx.shadowOffsetX = shadowOffsetX;
    ctx.shadowOffsetY = shadowOffsetY;
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
