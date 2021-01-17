# Can-draw

With `can-draw`, you CAN DRAW canvas more conveniently.

## How to use

1. Use a umd bundle
```html
<div id="container"></div>
<!-- cdn -->
<script src="https://unpkg.com/can-draw@0.1.1-1/dist/umd/can-draw.min.js"></script>
<!-- compile and build a local bundle -->
<script src="yourLocalPath/can-draw.min.js"></script>
<script>
  var canDraw = new CanDraw({
    container: document.getElementById('container'),
    width: 400,
    height: 400
  });
  // ...
</script>
```

2. Use with npm
    1. Install
    
    ```shell
    npm i can-draw --save
    ```
    
    2. Import
    
    ```js
     // es module
     import CanDraw from 'can-draw';
     // commonjs
     var CanDraw = require('can-draw');
    ``` 


## Quick Start
```html
<div id="container"></div>
```

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
  x: rx,
  y: ry,
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
