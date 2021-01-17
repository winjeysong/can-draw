import {
  AllShapeConfigInterface,
  AllShapes,
  Coords,
  ICircleShapeConfig,
  ICustomShapeConfig,
  ShapeType,
} from '../types';

/**
 * 形状
 * 对各形状设置x，y时，内部会默认进行translate(x, y)的操作
 * 将坐标系进行平移操作，并以(x, y)作为新的坐标系原点
 * 即每个形状实例都有一个属于自己的内部坐标系
 *
 * Shape constructor to handle all shapes instance
 * @constructor
 * @memberOf CanDraw
 */
export class Shape {
  protected readonly _type: ShapeType | 'NONE';
  protected _contextMounted: boolean;
  protected _canvasCtx!: CanvasRenderingContext2D;
  protected _shapes: Array<AllShapes> = [];
  SHAPE_CONFIG!: AllShapeConfigInterface;

  protected constructor(type?: ShapeType) {
    this._type = type || 'NONE';
    this._contextMounted = false;
  }

  _mount(ctx: CanvasRenderingContext2D) {
    this._canvasCtx = ctx;
    this._contextMounted = true;

    return this;
  }

  add(...shapes: Array<AllShapes>) {
    this._shapes.push(...shapes);

    return this;
  }

  clear() {
    this._shapes.length = 0;

    return this;
  }

  getType() {
    return this._type;
  }

  getShapes() {
    return this._shapes;
  }

  getIsContextMounted() {
    return this._contextMounted;
  }
}

/**
 * CanDrawShape
 * @abstract
 * @constructor
 */
export abstract class CanDrawShape extends Shape {
  SHAPE_CONFIG!: Exclude<AllShapeConfigInterface, ICustomShapeConfig>;

  protected constructor(type: Exclude<ShapeType, 'CUSTOM'>) {
    super(type);
  }

  /**
   * 相对于当前位置进行偏移
   * @param {number} x
   * @param{number} y
   */
  setOffsetXY({ x, y }: Coords) {
    // @ts-ignore
    x && (this.SHAPE_CONFIG.x = this.SHAPE_CONFIG.x + x);
    // @ts-ignore
    y && (this.SHAPE_CONFIG.y = this.SHAPE_CONFIG.y + y);
  }
  /**
   * 设置绘图原点
   * @param x
   * @param y
   */
  setXY({ x, y }: Coords) {
    x && (this.SHAPE_CONFIG.x = x);
    y && (this.SHAPE_CONFIG.y = y);
  }
  /**
   * 重新设置配置项
   * @param config
   * @param merge 是否合并配置项
   */
  setConfig(config: Exclude<AllShapeConfigInterface, ICustomShapeConfig>, merge: boolean = true) {
    if (merge) {
      this.SHAPE_CONFIG = {
        ...this.SHAPE_CONFIG,
        ...(config as Partial<Exclude<AllShapeConfigInterface, ICustomShapeConfig>>),
      };
    } else {
      this.SHAPE_CONFIG = config;
    }
  }
}
