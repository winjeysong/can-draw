import { Shape } from './';
import { inherits } from '../util';
import { ICustomShapeConfig } from '../types';

/**
 * 自定义形状，使用canvas原生api绘制
 */
class CustomShape extends Shape {
  SHAPE_CONFIG: ICustomShapeConfig;
  constructor(config: ICustomShapeConfig) {
    super('CUSTOM');
    this.SHAPE_CONFIG = config;
  }

  _drawShape() {
    const ctx = this._canvasCtx;
    const config = this.SHAPE_CONFIG;
    ctx.save();
    Object.keys(config).forEach(c => {
      if (c === 'drawFunc') {
        config.drawFunc(ctx);
      } else {
        ctx[c] = config[c];
      }
    });
    ctx.restore();
  }
}

export default CustomShape;
