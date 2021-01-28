---
id: how-to-use
title: How to Use
---

Since CanDraw is bundled and outputted in 3 standardized javascript module formats - `CommonJS` , `UMD` and `ES Modules` , it can be compatible with most of the environments.

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
