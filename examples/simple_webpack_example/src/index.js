import CanDraw from 'can-draw';
import './style.css';

const canDraw = new CanDraw({ container: document.getElementById('container') });
const shape = new CanDraw.Shape();
const minVal = 0,
  maxVal = 100,
  splitNumber = 5,
  currentValue = 80,
  center = ['50%', '55%'],
  totalRadius = (3 / 2) * Math.PI; // 5/4Pi ~ -1/4Pi;

const shapes = {
  // inner circle
  circle1: new CanDraw.Circle({
    radius: 0,
    angle: 360,
    fill: true,
    shadowColor: '#ddd',
    shadowBlur: 4,
    shadowOffsetX: 2,
    shadowOffsetY: 2,
  }),
  // dashed grey ring
  circle2: new CanDraw.Circle({
    radius: 0,
    angle: 270,
    rotate: -225,
    strokeWidth: 10,
    stroke: '#ddd',
    dash: [2, 2],
    pathClosed: false,
  }),
  // dashed gradient ring
  circle3: new CanDraw.Circle({
    radius: 0,
    rotate: -225,
    stroke: true,
    dash: [2, 2],
    pathClosed: false,
  }),
  text: new CanDraw.Text({
    text: currentValue,
    fill: '#FFFFFF',
    fontSize: 20,
    fontFamily: 'sans-serif',
    textAlign: 'center',
    textBaseline: 'middle',
  }),
  labels: Array.from(Array(splitNumber).keys()).map(drawLabels),
};

startAnimation();

window.addEventListener('resize', function resizeHandler() {
  canDraw.resize();
  draw();
});

function draw(value) {
  const width = canDraw.getWidth();
  const height = canDraw.getHeight();
  const halfWidth = width / 2;
  const halfHeight = height / 2;
  const maxRadius = Math.min(halfHeight, halfWidth) - 2;
  const rx = width * (parseFloat(center[0]) / 100);
  const ry = height * ((parseFloat(center[1]) ?? parseFloat(center[0])) / 100);
  const rotateAngle = ((((value - minVal) / (maxVal - minVal)) * 3) / 2) * 180;

  const ringWidth = maxRadius * 0.25;
  const textWidth = maxRadius * 0.15;
  const centerRadius = maxRadius - ringWidth - maxRadius * 0.05 - textWidth;
  const ringRadius = maxRadius - ringWidth / 2 - textWidth;

  shapes.circle1.setConfig({
    radius: centerRadius,
    x: rx,
    y: ry,
    gradient: {
      type: 'linear',
      start: [0, -centerRadius],
      end: [0, centerRadius],
      colorStops: [
        { offset: 0, color: '#70a7e7' },
        { offset: 1, color: '#2B84FF' },
      ],
    },
  });
  shapes.circle2.setConfig({
    radius: ringRadius,
    strokeWidth: ringWidth,
    x: rx,
    y: ry,
  });
  shapes.circle3.setConfig({
    radius: ringRadius,
    angle: rotateAngle,
    strokeWidth: ringWidth,
    x: rx,
    y: ry,
    gradient: {
      type: 'linear',
      end: [-halfHeight, -halfHeight],
      start: [halfHeight, halfHeight],
      colorStops: [
        { offset: 0, color: '#86d4fc' },
        { offset: 1, color: '#0768f6' },
      ],
    },
  });
  shapes.text.setConfig({
    x: rx,
    y: ry,
    fontSize: Math.round(maxRadius * 0.5),
  });

  shapes.labels.forEach((label, i) => {
    const halfTextWidth = label.getWidth() / 2;
    const deg = (5 / 4) * Math.PI - (i / (splitNumber - 1)) * totalRadius;
    let [x, y] = [
      (maxRadius - textWidth * 0.5) * Math.cos(deg),
      -(maxRadius - textWidth * 0.5) * Math.sin(deg),
    ];
    if (deg === Math.PI / 2) {
      x = -halfTextWidth;
      y = -(maxRadius - textWidth * 0.5);
    }
    label.setConfig({
      x: rx + x,
      y: ry + y,
      fontSize: Math.round(maxRadius * 0.1),
    });
  });

  canDraw.clear();
  shape.add(...Object.values(shapes).flat());
  canDraw.add(shape);
}

function startAnimation() {
  let startTime;
  let v = 0;
  function animate(stamp) {
    !startTime && (startTime = stamp);
    v += (currentValue - v) * 0.1;
    draw(v);

    if (v.toPrecision(4) < currentValue) {
      requestAnimationFrame(animate);
    }
  }

  requestAnimationFrame(animate);
}

function drawLabels(i) {
  const piece = (maxVal - minVal) / (splitNumber - 1);
  const decimal = getDecimal(piece);
  const labelNum = (
    (minVal * Math.pow(10, decimal) + piece * Math.pow(10, decimal) * i) /
    Math.pow(10, decimal)
  ).toString();
  const deg = (5 / 4) * Math.PI - (i / (splitNumber - 1)) * totalRadius;

  return new CanDraw.Text({
    fill: '#666',
    text: labelNum,
    fontSize: 12,
    fontFamily: 'sans-serif',
    fontWeight: 300,
    textAlign: deg === Math.PI ? 'center' : deg > Math.PI / 2 ? 'right' : 'left',
  });
}

function getDecimal(num) {
  const d = String(num).split('.')[1];
  return !!d ? d.length : 0;
}
