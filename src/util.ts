/**
 * @param child
 * @param parent
 */
import { Gradient } from './types';

export function inherits(child: any, parent: any) {
  const proto = Object.create(parent.prototype);
  proto.constructor = child;
  child.prototype = proto;
}

export const deg2Rad = (deg: number) => (deg / 180) * Math.PI;

export const isNum = (v: string) => /^[\-+]?\d+(\.\d+)?$/.test(v);

// 数字值默认带上px，其他值直接返回
export const makePx = (n: string) => (isNum(n) ? n + 'px' : n) ?? '';

export function makeGradient(gradient?: Gradient) {
  const ctx: CanvasRenderingContext2D = this._canvasCtx;
  let fillGradient: CanvasGradient | undefined;
  if (gradient) {
    const { start, end, colorStops = [], type } = gradient;
    switch (type) {
      default:
        break;
      case 'linear':
        // @ts-ignore
        fillGradient = ctx.createLinearGradient(...start, ...end);
        break;
      case 'radial':
        // @ts-ignore
        fillGradient = ctx.createRadialGradient(...start, ...end);
    }
    colorStops.forEach(c => {
      fillGradient!.addColorStop(c.offset, c.color);
    });
  }

  return fillGradient;
}

export function getFakeCtx() {
  const ele = document.createElement('canvas');
  return ele.getContext('2d');
}
