import CustomShape from './Shapes/CustomShape';
import Circle from './Shapes/Circle';
import Text from './Shapes/Text';
import Ring from './Shapes/Ring';
import Line from './Shapes/Line';
import { makePx } from './util';
import { IDrawConfig } from './types';
import { Shape } from './Shapes';

const makeCssTextWH = (w: string | number, h: string | number) =>
  `width: ${makePx(String(w))}; height: ${makePx(String(h))};`;

const getSize = (container: HTMLElement): [number, number] => {
  const containerRect = container.getBoundingClientRect();
  const containerCss = getComputedStyle(container);

  return [
    (containerRect.width || parseFloat(containerCss.width)) | 0,
    (containerRect.height || parseFloat(containerCss.height)) | 0,
  ];
};

/**
 * 方便日常使用封装canvas绘制工具
 * @returns {CanDraw}
 * @constructor
 * @description 祖先元素必须是有具体宽度的，在使用flex或grid布局时，必须设定width为绝对值或百分比值，否则会造成canvas容器宽度计算错误
 * @author winjey-song@163.com
 */
class CanDraw {
  static Shape: Shape;
  static CustomShape: CustomShape;
  static Circle: Circle;
  static Line: Line;
  static Text: Text;
  static Ring: Ring;

  public CONFIG: IDrawConfig;
  public DPR: number;
  private _shapes: Array<Circle> = [];
  private _willDraw: boolean = false;
  private _size: [number, number] | [] = [];
  private _containerEle: HTMLElement | null = null;
  private _canvasEle: HTMLCanvasElement | null = null;
  private _canvasCtx: CanvasRenderingContext2D | null = null;

  constructor(config: IDrawConfig) {
    this.CONFIG = config || {};
    this.DPR = window.devicePixelRatio || 1;
    this.init(); // 直接调用init方法，如果初始化时设置了容器，则直接生成元素，否则需要手动调用setContainer和init方法
  }

  /**
   * 设置容器
   * @param {HTMLElement} container
   * @returns {CanDraw}
   */
  setContainer(container: HTMLElement) {
    this._containerEle = container;
    this.CONFIG.container = container;

    return this;
  }
  /**
   * 获取是否绘制的状态
   * @returns {boolean}
   */
  getWillDraw() {
    return this._willDraw;
  }
  /**
   * 获取容器宽度
   * @returns {number}
   */
  getWidth() {
    return this._size[0] || 0;
  }
  /**
   * 获取容器高度
   * @returns {number}
   */
  getHeight() {
    return this._size[1] || 0;
  }
  /**
   * 获取canvas上下文
   * @returns {CanvasRenderingContext2D | null}
   */
  getCanvasCtx() {
    return this._canvasCtx;
  }
  /**
   * 初始化容器与canvas画布
   * @returns {CanDraw}
   */
  init() {
    const { container, width, height } = this.CONFIG;
    if (!container) {
      this._willDraw = false;
      return this;
    }

    this._willDraw = true;

    const scale = this.DPR;
    const containerEle = (this._containerEle = container); // 容器
    containerEle.innerHTML = '';

    const wrapperEle = document.createElement('div'); // 包裹层，主要用来动态获取宽高，宽高依赖于容器
    const canvasEle = (this._canvasEle = document.createElement('canvas')); // 画布

    containerEle.style.cssText += `${makeCssTextWH(
      width as number,
      height as number,
    )}; position: relative;`;

    const size = (this._size = getSize(containerEle));
    wrapperEle.style.cssText = `${makeCssTextWH(...size)} position: relative;`;
    canvasEle.width = size[0] * scale;
    canvasEle.height = size[1] * scale;
    canvasEle.style.cssText = `${makeCssTextWH(
      ...size,
    )} position: absolute; left: 0; top: 0; padding: 0px; margin: 0px; border: 0px;`;

    containerEle.appendChild(wrapperEle);
    wrapperEle.appendChild(canvasEle);

    this._canvasCtx = canvasEle.getContext('2d');
    this._canvasCtx!.scale(scale, scale);

    return this;
  }
  /**
   * 窗口resize时调用
   * @returns {CanDraw}
   */
  resize() {
    const scale = this.DPR;
    const wrapperEle = this._containerEle!.children[0] as HTMLElement;
    const canvasEle = this._canvasEle as HTMLCanvasElement;

    const oldSize = this._size;
    const size = (this._size = getSize(this._containerEle as HTMLElement));

    if (oldSize[0] !== size[0] || oldSize[1] !== size[1]) {
      wrapperEle.style.display = 'none';

      wrapperEle.style.display = '';
      wrapperEle.style.cssText += makeCssTextWH(...size);
      canvasEle.width = size[0] * scale;
      canvasEle.height = size[1] * scale;
      canvasEle.style.cssText += makeCssTextWH(...size);

      this._canvasCtx!.scale(scale, scale);
    }

    return this;
  }
  /**
   * 清空画布
   * @returns {CanDraw}
   */
  clear(shape?: Shape) {
    const ctx = this._canvasCtx;
    ctx!.clearRect(0, 0, ...(this._size as [number, number]));
    shape && shape.clear();

    return this;
  }
  /**
   * 将形状添加并绘制到画布
   * @param shape
   * @returns {CanDraw}
   */
  add(shape: Shape) {
    const shapes = shape.getShapes();
    shapes.forEach(s => {
      s._mount(this._canvasCtx as CanvasRenderingContext2D);
      s.getIsContextMounted() && s._drawShape();
    });

    return this;
  }
}

// @ts-ignore
CanDraw.Shape = Shape;
// @ts-ignore
CanDraw.CustomShape = CustomShape;
// @ts-ignore
CanDraw.Circle = Circle;
// @ts-ignore
CanDraw.Text = Text;
// @ts-ignore
CanDraw.Ring = Ring;
// @ts-ignore
CanDraw.Line = Line;

export default CanDraw;
