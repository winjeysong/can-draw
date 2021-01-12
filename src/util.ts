import { Gradient, LinearGradientCoords, RadialGradientCoords } from './types';

export function inherits(child: any, parent: any) {
  const proto = Object.create(parent.prototype);
  proto.constructor = child;
  child.prototype = proto;
}

export const deg2Rad = (deg: number) => (deg / 180) * Math.PI;

export const isNum = (v: string) => /^[\-+]?\d+(\.\d+)?$/.test(v);

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
        fillGradient = ctx.createLinearGradient(
          ...(start as LinearGradientCoords),
          ...(end as LinearGradientCoords),
        );
        break;
      case 'radial':
        fillGradient = ctx.createRadialGradient(
          ...(start as RadialGradientCoords),
          ...(end as RadialGradientCoords),
        );
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
