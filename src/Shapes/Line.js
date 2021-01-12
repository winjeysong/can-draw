import Shape from './';
import { deg2Rad, inherits, makeGradient } from '../util';

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
 * @returns {Line}
 * @constructor
 */
function Line(config) {
  Shape.call(this, 'LINE');
  this.SHAPE_CONFIG = config || {};

  let that = this;
  this._drawShape = function() {
    const ctx = this._canvasCtx;
    const {
      x = 0,
      y = 0,
      points = [],
      fill,
      stroke,
      strokeWidth,
      gradient,
      rotate = 0,
      dash,
      pathClosed = true,
      lineCap = 'butt',
      shadowBlur,
      shadowColor,
      shadowOffsetX,
      shadowOffsetY,
      opacity,
    } = that.SHAPE_CONFIG;

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
    const startX = copiedPoints.shift();
    const startY = copiedPoints.shift();
    ctx.moveTo(startX, startY);
    copiedPoints.forEach((p, idx, arr) => {
      const x = arr.shift();
      const y = arr.shift();
      ctx.lineTo(x, y);
    });
    copiedPoints.length > 1 && ctx.lineTo(...copiedPoints);

    if (willFill) {
      ctx.fillStyle = resolvedGradient || fill;
      ctx.fill();
    }

    if (willStroke) {
      ctx.strokeStyle = resolvedGradient || stroke;
      ctx.lineWidth = strokeWidth;
      !!dash && ctx.setLineDash(dash);
      pathClosed && ctx.closePath();
      ctx.stroke();
    }

    ctx.restore();
  };

  return this;
}

inherits(Line, Shape);

Line.prototype = Object.assign(Line.prototype, {
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

export default Line;