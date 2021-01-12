import { CanDrawShape } from './';
import { deg2Rad, makeGradient } from '../util';
import { ILineShapeConfig } from '../types';

/**
 * 路径/闭合路径
 *
 * draw line or polyline
 * @constructor
 * @memberOf CanDraw
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
    ctx.shadowBlur = shadowBlur as number;
    ctx.shadowColor = shadowColor as string;
    ctx.shadowOffsetX = shadowOffsetX as number;
    ctx.shadowOffsetY = shadowOffsetY as number;
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
