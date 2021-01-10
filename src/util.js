/**
 * @param child
 * @param parent
 */
export function inherits(child, parent) {
  const proto = Object.create(parent.prototype);
  proto.constructor = child;
  child.prototype = proto;
}

export const deg2Rad = deg => (deg / 180) * Math.PI;

export const isNum = v => /^[\-+]?\d+(\.\d+)?$/.test(v);

// 数字值默认带上px，其他值直接返回
export const makePx = n => (isNum(n) ? n + 'px' : n) ?? '';

export function makeGradient(gradient) {
  const ctx = this._canvasCtx;
  let fillGradient;
  if (gradient) {
    const { start, end, colorStops = [], type } = gradient;
    switch (type) {
      default:
        break;
      case 'linear':
        fillGradient = ctx.createLinearGradient(...start, ...end);
        break;
      case 'radial':
        fillGradient = ctx.createRadialGradient(...start, ...end);
    }
    colorStops.forEach(c => {
      fillGradient.addColorStop(c.offset, c.color);
    });
  }

  return fillGradient;
}
