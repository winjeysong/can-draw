import Shape from './';
import { deg2Rad, inherits, makeGradient } from '../util';

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
 * @returns {Circle}
 * @constructor
 */
function Circle(config) {
  Shape.call(this, 'CIRCLE');
  this.SHAPE_CONFIG = config || {};
  let that = this;

  this._drawShape = function() {
    const ctx = this._canvasCtx;
    const {
      x = 0,
      y = 0,
      radius,
      angle = 360,
      fill,
      stroke,
      strokeWidth,
      clockwise = true,
      gradient,
      rotate = 0,
      dash,
      pathClosed = true,
      shadowBlur,
      shadowColor,
      shadowOffsetX,
      shadowOffsetY,
    } = that.SHAPE_CONFIG;

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

    if (willFill) {
      ctx.beginPath();
      ctx.fillStyle = resolvedGradient || fill;
      ctx.moveTo(0, 0);
      ctx.arc(0, 0, radius, 0, deg2Rad(angle), !clockwise);
      ctx.fill();
    }

    if (willStroke) {
      ctx.beginPath();
      ctx.strokeStyle = resolvedGradient || stroke;
      ctx.lineWidth = strokeWidth;
      pathClosed && !moreThan360 && ctx.moveTo(0, 0);
      !!dash && ctx.setLineDash(dash);
      ctx.arc(0, 0, radius, 0, deg2Rad(angle), !clockwise);
      pathClosed && ctx.closePath();
      ctx.stroke();
    }

    ctx.restore();
  };

  return this;
}

inherits(Circle, Shape);

Circle.prototype = Object.assign(Circle.prototype, {
  /**
   * 设置偏移
   * @param {number} x
   * @param{number} y
   */
  setOffset(x, y) {
    this.SHAPE_CONFIG.x = this.SHAPE_CONFIG.x + x;
    this.SHAPE_CONFIG.y = this.SHAPE_CONFIG.y + y;
  },
  /**
   * 设置绘图原点
   * @param x
   * @param y
   */
  setXY({ x, y }) {
    x && (this.SHAPE_CONFIG.x = x);
    y && (this.SHAPE_CONFIG.y = y);
  },
  /**
   * 重新设置配置项
   * @param config
   * @param merge 是否合并配置项
   */
  setConfig(config, merge = true) {
    if (merge) {
      this.SHAPE_CONFIG = {
        ...this.SHAPE_CONFIG,
        ...config,
      };
    } else {
      this.SHAPE_CONFIG = config;
    }
  },
});

export default Circle;
