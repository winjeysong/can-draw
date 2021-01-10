import Shape from './';
import { deg2Rad, inherits, makeGradient } from '../util';

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
 * @returns {Ring}
 * @constructor
 */
function Ring(config) {
  Shape.call(this, 'RING');
  this.SHAPE_CONFIG = config || {};

  let that = this;
  this._drawShape = function() {
    const ctx = this._canvasCtx;
    const {
      x = 0,
      y = 0,
      innerRadius,
      outerRadius,
      angle = 360,
      fill,
      stroke,
      strokeWidth,
      clockwise = true,
      gradient,
      rotate = 0,
      dash,
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
      ctx.strokeStyle = resolvedGradient || stroke;
      ctx.lineWidth = strokeWidth;
      !!dash && ctx.setLineDash(dash);
      ctx.stroke();
    }

    ctx.restore();
  };

  return this;
}

inherits(Ring, Shape);

Ring.prototype = Object.assign(Ring.prototype, {
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

export default Ring;
