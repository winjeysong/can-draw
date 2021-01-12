import Circle from './Shapes/Circle';
import Line from './Shapes/Line';
import CustomShape from './Shapes/CustomShape';

export type ShapeType = 'CIRCLE' | 'LINE' | 'RING' | 'CUSTOM' | 'TEXT';
export type GradientType = 'linear' | 'radial';
export type GradientColorStops = Array<{ offset: number; color: string }>;
export type Gradient = {
  start: number[];
  end: number[];
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
  x?: number;
  y?: number;
  angle?: number;
  fill?: string;
  stroke?: string;
  strokeWidth?: number;
  clockwise?: boolean;
  gradient?: Gradient;
  rotate?: number;
  dash?: number[];
  lineCap?: CanvasLineCap;
  opacity?: number;
}

export interface ICircleShapeConfig extends IShapeConfig, CanvasShadowStyles {
  radius: number;
  pathClosed?: boolean;
}
export interface ILineShapeConfig extends IShapeConfig, CanvasShadowStyles {
  points: number[];
  pathClosed?: boolean;
}

export interface IRingShapeConfig extends IShapeConfig, CanvasShadowStyles {
  innerRadius: number;
  outerRadius: number;
}

export interface ITextShapeConfig extends IShapeConfig, CSSStyleFont, CanvasShadowStyles {
  text: string;
  textAlign: CanvasTextAlign;
}

export interface ICustomShapeConfig extends CanvasRenderingContext2D {
  drawFunc: (ctx: CanvasRenderingContext2D) => void;
}

export type AllShapeConfigInterface =
  | ICircleShapeConfig
  | ILineShapeConfig
  | IRingShapeConfig
  | ITextShapeConfig
  | ICustomShapeConfig;

export type AllShapes = Circle | Line | CustomShape;
