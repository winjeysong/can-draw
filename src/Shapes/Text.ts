import { CanDrawShape } from './';
import { deg2Rad, getFakeCtx, makePx } from '../util';
import { CSSStyleFont, ITextShapeConfig } from '../types';

/**
 * 文本
 *
 * draw text
 * @constructor
 * @memberOf CanDraw
 */
class Text extends CanDrawShape {
  SHAPE_CONFIG: ITextShapeConfig;
  constructor(config: ITextShapeConfig) {
    super('TEXT');
    this.SHAPE_CONFIG = config;
  }

  private _setFont({
    fontSize,
    fontFamily,
    fontStyle,
    fontVariant,
    fontWeight,
    lineHeight,
  }: Partial<CSSStyleFont>) {
    const ctx = this._canvasCtx;
    ctx.font = [
      fontStyle,
      fontVariant,
      fontWeight,
      makePx(fontSize || '') +
        (['number', 'string'].some(type => type === typeof lineHeight) ? '/' + lineHeight : ''),
      fontFamily,
    ]
      .join(' ')
      .trim();
  }

  _drawShape() {
    const ctx = this._canvasCtx;
    const {
      x = 0,
      y = 0,
      text,
      fill,
      stroke,
      rotate = 0,
      fontSize,
      fontFamily,
      fontStyle,
      fontVariant,
      fontWeight,
      lineHeight,
      textAlign,
      shadowBlur,
      shadowColor,
      shadowOffsetX,
      shadowOffsetY,
      opacity = 1,
    } = this.SHAPE_CONFIG;

    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(deg2Rad(rotate));
    ctx.shadowBlur = shadowBlur as number;
    ctx.shadowColor = shadowColor as string;
    ctx.shadowOffsetX = shadowOffsetX as number;
    ctx.shadowOffsetY = shadowOffsetY as number;
    ctx.globalAlpha = opacity;
    ctx.textAlign = textAlign as CanvasTextAlign;

    this._setFont({
      fontSize,
      fontFamily,
      fontStyle,
      fontVariant,
      fontWeight,
      lineHeight,
    });

    const willFill = !!(text && fill);
    const willStroke = !!(text && stroke);

    if (willFill) {
      // @ts-ignore
      ctx.fillStyle = fill;
      ctx.fillText(text, 0, 0);
    }

    if (willStroke) {
      // @ts-ignore
      ctx.strokeStyle = stroke;
      ctx.strokeText(text, 0, 0);
    }

    ctx.restore();
  }

  /**
   * 获取文本宽度
   * @returns {number}
   */
  getWidth() {
    const ctx = getFakeCtx();
    if (ctx) {
      ctx.save();
      this._setFont.call({ ...this, _canvasCtx: ctx }, this.SHAPE_CONFIG);
      const width = ctx.measureText(this.SHAPE_CONFIG.text).width;
      ctx.restore();
      return width;
    }
  }
}

export default Text;
