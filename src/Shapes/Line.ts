import { CanDrawShape } from './';
import { deg2Rad, inherits, makeGradient } from '../util';
import { ILineShapeConfig } from '../types';

/**
 * 路径/闭合路径
 * @param {number} config.x
 * @param {number} config.y
 * @param {Array<number>} config.points [x0, y0, x1, y1, ..., xn, yn]
 * @param {string} config.fill
 * @param {string} config.stroke
 * @param {number} config.strokeWidth
 * @param config.gradient
 * @param {string} config.gradient.type "linear" | "radial"
 * @param {number[]} config.gradient.start [x0, y0, r0]
 * @param {number[]} config.gradient.end [x1, y1, r1]
 * @param {Array<{ offset: number, color: string}>} config.gradient.colorStops
 * @param {number} config.rotate
 * @param {number[]} config.dash
 * @param {boolean} config.pathClosed
 * @param {string} config.lineCap
 * @param {number} config.shadowBlur,
 * @param {string} config.shadowColor,
 * @param {number} config.shadowOffsetX,
 * @param {number} config.shadowOffsetY,
 * @param {number} config.opacity
 * @constructor
 */

class Line extends CanDrawShape {
  SHAPE_CONFIG: ILineShapeConfig;
  constructor(config: ILineShapeConfig) {
    super('LINE');
    this.SHAPE_CONFIG = config;
  }

  _drawShape() {
    const ctx = this._canvasCtx;
    const {
      x = 0,
      y = 0,
      points = [],
      fill,
      stroke,
      strokeWidth = 1,
      gradient,
      rotate = 0,
      dash,
      pathClosed = true,
      lineCap = 'butt',
      shadowBlur,
      shadowColor,
      shadowOffsetX,
      shadowOffsetY,
      opacity = 1,
    } = this.SHAPE_CONFIG;

    const resolvedGradient = makeGradient.call(this, gradient);
    const willFill = !!fill;
    const willStroke = !!stroke;

    ctx.save();

    ctx.translate(x, y);
    ctx.rotate(deg2Rad(rotate));
    ctx.lineCap = lineCap;
    ctx.shadowBlur = shadowBlur;
    ctx.shadowColor = shadowColor;
    ctx.shadowOffsetX = shadowOffsetX;
    ctx.shadowOffsetY = shadowOffsetY;
    ctx.globalAlpha = opacity;

    ctx.beginPath();
    const copiedPoints = [...points];
    const startX = copiedPoints.shift() as number;
    const startY = copiedPoints.shift() as number;
    ctx.moveTo(startX, startY);
    copiedPoints.forEach((p, idx, arr) => {
      const x = arr.shift() as number;
      const y = arr.shift() as number;
      ctx.lineTo(x, y);
    });
    // @ts-ignore
    copiedPoints.length > 1 && ctx.lineTo(...copiedPoints);

    if (willFill) {
      // @ts-ignore
      ctx.fillStyle = resolvedGradient || fill;
      ctx.fill();
    }

    if (willStroke) {
      // @ts-ignore
      ctx.strokeStyle = resolvedGradient || stroke;
      ctx.lineWidth = strokeWidth;
      !!dash && ctx.setLineDash(dash);
      pathClosed && ctx.closePath();
      ctx.stroke();
    }

    ctx.restore();
  }
}

export default Line;
