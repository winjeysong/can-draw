/**
 * 形状
 * 对各形状设置x，y时，内部会默认进行translate(x, y)的操作
 * 将坐标系进行平移操作，并以(x, y)作为新的坐标系原点
 * 即每个形状实例都有一个属于自己的内部坐标系
 * @constructor
 */
function Shape(type) {
  this._type = type;
  this._contextMounted = false;

  let that = this;
  this._mountContext = function() {
    that._canvasCtx = this._canvasCtx;
    that._contextMounted = true;
  }
}

Shape.prototype = {
  constructor: Shape,
  getType() {
    return this._type;
  }
}

export default Shape;
