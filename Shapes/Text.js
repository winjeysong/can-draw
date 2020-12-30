import Shape from './';
import { inherits, makePx } from '../util';

/**
 * 文本
 * @param {number} config.x
 * @param {number} config.y
 * @param {string} config.text
 * @param {string} config.fill
 * @param {string} config.stroke
 * @param {number | string} config.fontSize
 * @param {string} config.fontFamily
 * @param {string} config.fontStyle
 * @param {string} config.fontVariant
 * @param {number | string} config.fontWeight
 * @param {number | string} config.lineHeight
 * @param {string} config.textAlign
 * @returns {Text}
 * @constructor
 */
function Text(config) {
  Shape.call(this, 'TEXT');
  this.SHAPE_CONFIG = config || {};
  this._setFont = function _setFont({
     fontSize,
     fontFamily,
     fontStyle,
     fontVariant,
     fontWeight,
     lineHeight,
   }) {
    const ctx = this._canvasCtx;
    ctx.font = [
      fontStyle,
      fontVariant,
      fontWeight,
      makePx(fontSize) + (['number', 'string'].some(type => type === typeof lineHeight) ? '/' + lineHeight : ''),
      fontFamily
    ]
      .join(' ')
      .trim();
  }

  let that = this;

  this._drawShape = function() {
    const ctx = this._canvasCtx;
    const {
      x,
      y,
      text,
      fill,
      stroke,
      fontSize,
      fontFamily,
      fontStyle,
      fontVariant,
      fontWeight,
      lineHeight,
      textAlign,
    } = that.SHAPE_CONFIG;

    ctx.save();
    ctx.translate(x, y);
    ctx.fillStyle = fill;
    ctx.strokeStyle = stroke;
    ctx.textAlign = textAlign;

    that._setFont.call(this, { fontSize, fontFamily, fontStyle, fontVariant, fontWeight, lineHeight });

    const willFill = !!(text && fill);
    const willStroke = !!(text && stroke);

    willFill && ctx.fillText(text, 0, 0);
    willStroke && ctx.strokeText(text, 0, 0);

    ctx.restore();
  }

  return this;
}

inherits(Text, Shape);

Text.prototype = Object.assign(Text.prototype, {
  /**
   * 获取文本宽度
   * @returns {number}
   */
  getWidth() {
    if (this._contextMounted) {
      const ctx = this._canvasCtx;
      ctx.save();
      this._setFont(this.SHAPE_CONFIG);
      const width = ctx.measureText(this.SHAPE_CONFIG.text).width;
      ctx.restore();
      return width;
    }
  },
  /**
   * 设置偏移
   * @param {number} x
   * @param{number} y
   */
  setOffset(x, y) {
    this.SHAPE_CONFIG.x = this.SHAPE_CONFIG.x + x;
    this.SHAPE_CONFIG.y = this.SHAPE_CONFIG.y + y;
  },
});

export default Text;
