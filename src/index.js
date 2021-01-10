import CustomShape from './Shapes/CustomShape';
import Circle from './Shapes/Circle';
import Text from './Shapes/Text';
import Ring from './Shapes/Ring';
import Line from './Shapes/Line';
import { makePx } from './util';

const makeCssTextWH = (w, h) => `width: ${makePx(w)}; height: ${makePx(h)};`;

const getSize = container => {
  const containerRect = container.getBoundingClientRect();
  const containerCss = getComputedStyle(container);

  return [
    (containerRect.width || parseFloat(containerCss.width)) | 0,
    (containerRect.height || parseFloat(containerCss.height)) | 0,
  ];
};

/**
 * 方便日常使用封装canvas绘制工具
 * @param config
 * @returns {Draw}
 * @constructor
 * @description 祖先元素必须是有具体宽度的，在使用flex或grid布局时，必须设定width为绝对值或百分比值，否则会造成canvas容器宽度计算错误
 * @author winjey-song@163.com
 */
function Draw(config) {
  this.CONFIG = config || {};
  this.DPR = window.devicePixelRatio || 1;
  this._shapes = [];
  this.init(); // 直接调用init方法，如果初始化时设置了容器，则直接生成元素，否则需要手动调用setContainer和init方法

  return this;
}

Draw.prototype = {
  constructor: Draw,
  /**
   * 设置容器
   * @param {HTMLElement} container
   * @returns {Draw}
   */
  setContainer(container) {
    this._containerEle = container;
    this.CONFIG.container = container;

    return this;
  },
  /**
   * 获取是否绘制的状态
   * @returns {boolean}
   */
  getWillDraw() {
    return this._willDraw;
  },
  /**
   * 获取容器宽度
   * @returns {number}
   */
  getWidth() {
    return this._size[0];
  },
  /**
   * 获取容器高度
   * @returns {number}
   */
  getHeight() {
    return this._size[1];
  },
  /**
   * 获取canvas上下文
   * @returns {CanvasRenderingContext2D}
   */
  getCanvasCtx() {
    return this._canvasCtx;
  },
  /**
   * 初始化容器与canvas画布
   * @returns {Draw}
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

    containerEle.style.cssText += `${makeCssTextWH(width, height)}; position: relative;`;

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
    this._canvasCtx.scale(scale, scale);

    return this;
  },
  /**
   * 窗口resize时调用
   * @returns {Draw}
   */
  resize() {
    const scale = this.DPR;
    const wrapperEle = this._containerEle.children[0];
    const canvasEle = this._canvasEle;

    const oldSize = this._size;
    const size = (this._size = getSize(this._containerEle));

    if (oldSize[0] !== size[0] || oldSize[1] !== size[1]) {
      wrapperEle.style.display = 'none';

      wrapperEle.style.display = '';
      wrapperEle.style.cssText += makeCssTextWH(...size);
      canvasEle.width = size[0] * scale;
      canvasEle.height = size[1] * scale;
      canvasEle.style.cssText += makeCssTextWH(...size);

      this._canvasCtx.scale(scale, scale);
    }

    return this;
  },
  /**
   * 清空画布
   * @returns {Draw}
   */
  clear() {
    const ctx = this._canvasCtx;
    ctx.clearRect(0, 0, ...this._size);
    this._shapes.length = 0;

    return this;
  },
  /**
   * 将形状添加并绘制到画布
   * @param {CustomShape | Circle | Text} shapes
   * @returns {Draw}
   */
  add(...shapes) {
    this._shapes = this._shapes.concat(shapes);
    shapes.forEach(s => {
      s._drawShape.call(this);
    });

    return this;
  },
  /**
   * 将Draw实例挂载到Shape上
   * @param {CustomShape | Circle | Text} shapes
   */
  mount(...shapes) {
    shapes.forEach(s => {
      s._mountContext.call(this);
    });
  },
};

Draw.CustomShape = CustomShape;
Draw.Circle = Circle;
Draw.Text = Text;
Draw.Ring = Ring;
Draw.Line = Line;

export default Draw;
