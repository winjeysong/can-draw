import Shape from './';
import { inherits } from '../util';

/**
 * 自定义形状，使用canvas原生api绘制
 * @param config
 * @returns {CustomShape}
 * @constructor
 */
function CustomShape(config) {
  Shape.call(this, 'CUSTOM');
  this.SHAPE_CONFIG = config;

  this._drawShape = function() {
    const ctx = this._canvasCtx;
    ctx.save();
    Object.keys(config).forEach(c => {
      if (c === 'drawFunc') {
        config.drawFunc(ctx);
      } else {
        ctx[c] = config[c];
      }
    });
    ctx.restore();
  };

  return this;
}

inherits(CustomShape, Shape);

CustomShape.prototype = Object.assign(CustomShape.prototype, {});

export default CustomShape;
