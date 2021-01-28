---
id: quick-start
title: Quick Start
slug: /
---

CanDraw is more understandable and convenient to draw various shapes than `Canvas API` . Let's see a simple example below.

1. Create a `container` element.
```html
<div id="container"></div>
```
2. Draw a circle with CanDraw. It's obviously understandable that we create a circle and add it to CanDraw.
```js
// init `can-draw` area
var canDraw = new CanDraw({
  container: document.getElementById('container'),
  // if width/height is not given, CanDraw will 
  // get the width/height of container by default
  width: 100,
  height: 100
});
// create a shape instance, you can add different shapes to it
var shape = new CanDraw.Shape();

// a dashed circle
const circle = new CanDraw.Circle({
  x: 0,
  y: 0,
  angle: 360,
  radius: 10,
  strokeWidth: 2,
  stroke: '#0A6AEF',
  dash: [1, 2],
});

// clear `can-draw` area
canDraw.clear();
// add circle to shape instance
shape.add(circle);
// add shape instance to canDraw instance
// and draw circle
canDraw.add(shape);
```
