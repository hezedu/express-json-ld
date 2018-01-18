# express-json-ld

## 使用方法
```js
var express = require('express');
var app = express();
var JSONLD = require('express-json-ld');

JSONLD({
  app,
  indexPath: path.join(__dirname, 'public/index.html')
})
```
