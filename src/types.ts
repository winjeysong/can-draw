import Circle from './Shapes/Circle';
import Line from './Shapes/Line';
import CustomShape from './Shapes/CustomShape';
import Ring from './Shapes/Ring';
import Text from './Shapes/Text';

export type ShapeType = 'CIRCLE' | 'LINE' | 'RING' | 'CUSTOM' | 'TEXT';
export type GradientType = 'linear' | 'radial';
export type GradientColorStops = Array<{ offset: number; color: string }>;
/**
 * [x, y]
 */
export type LinearGradientCoords = [number, number];
/**
 * [rx, ry, r]
 */
export type RadialGradientCoords = [number, number, number];
export type Gradient = {
  start: LinearGradientCoords | RadialGradientCoords;
  end: LinearGradientCoords | RadialGradientCoords;
  type: GradientType;
  colorStops: GradientColorStops;
};
export type Coords = {
  x: number;
  y: number;
};
export type CSSStyleFont = Pick<
  CSSStyleDeclaration,
  'fontSize' | 'fontFamily' | 'fontStyle' | 'fontVariant' | 'fontWeight' | 'lineHeight'
>;

export interface IDrawConfig {
  container?: HTMLElement;
  width?: number;
  height?: number;
}

export interface IShapeConfig {
  /**
   * translate x
   * @default 0
   */
  x?: number;
  /**
   * translate y
   * @default 0
   */
  y?: number;
  /**
   * fill color
   *
   * NOTE: please set `fill` to `true`, if you want to fill shape with gradient color
   */
  fill?: string | boolean;
  /**
   * stroke color
   *
   * NOTE: please set `stroke` to `true`, if you want to stroke shape with gradient color
   */
  stroke?: string | boolean;
  /**
   * stroke width
   * @default 1
   */
  strokeWidth?: number;
  /**
   * gradient config
   * @example
   * {
   *   type: 'linear',
   *   start: [0, 0],
   *   end: [0, 10],
   *   colorStops: [
   *     { color: '#FFF', offset: 0 },
   *     { color: '#555', offset: 1 },
   *   ]
   * }
   * or
   * {
   *   type: 'radial',
   *   start: [0, 0, 10],
   *   end: [0, 10, 10],
   *   colorStops: [
   *     { color: '#FFF', offset: 0 },
   *     { color: '#555', offset: 1 },
   *   ]
   * }
   */
  gradient?: Gradient;
  /**
   * rotate in degree
   * @default 0
   */
  rotate?: number;
  /**
   * line dash
   */
  dash?: number[];
  /**
   * line cap
   * @default 'butt'
   */
  lineCap?: CanvasLineCap;
  /**
   * shape opacity
   * @default 1
   */
  opacity?: number;
}

export interface ICircleShapeConfig extends IShapeConfig, Partial<CanvasShadowStyles> {
  /**
   * shape radius
   */
  radius: number;
  /**
   * shape angle in degree
   * @default 360
   */
  angle?: number;
  /**
   * is clockwise
   * @default true
   */
  clockwise?: boolean;
  /**
   * close path or not
   */
  pathClosed?: boolean;
}
export interface ILineShapeConfig extends IShapeConfig, Partial<CanvasShadowStyles> {
  /**
   * points coords
   *
   * NOTE: the length of points must be even
   * @example
   * points = [0, 0, 0, 10, 10, 10] => moveTo(0, 0); lineTo(0, 10); lineTo(10, 10)
   */
  points: number[];
  /**
   * close path or not
   */
  pathClosed?: boolean;
}

export interface IRingShapeConfig extends IShapeConfig, Partial<CanvasShadowStyles> {
  /**
   * shape angle in degree
   * @default 360
   */
  angle?: number;
  /**
   * inner radius of ring
   */
  innerRadius: number;
  /**
   * outer radius of ring
   */
  outerRadius: number;
  /**
   * is clockwise
   */
  clockwise?: boolean;
}

export interface ITextShapeConfig extends IShapeConfig, CSSStyleFont, Partial<CanvasShadowStyles> {
  /**
   * text to draw
   */
  text: string;
  textAlign: CanvasTextAlign;
}

export interface ICustomShapeConfig extends Partial<CanvasRenderingContext2D> {
  /**
   * use canvas context methods
   */
  drawFunc: (ctx: CanvasRenderingContext2D) => void;
}

export type AllShapeConfigInterface =
  | ICircleShapeConfig
  | ILineShapeConfig
  | IRingShapeConfig
  | ITextShapeConfig
  | ICustomShapeConfig;

export type AllShapes = Circle | Line | Ring | Text | CustomShape;
