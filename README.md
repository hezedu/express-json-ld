# express-json-ld
非中间件
## 使用方法
安装：
```js
var express = require('express');
var app = express();
var JSONLD = require('express-json-ld');

JSONLD({
  app,
  indexPath: path.join(__dirname, 'public/index.html')
})
```
使用：
```js
app.get('/', function(req ,res, next){
  res.jsonLD([{
    name: 'JSON-LD',
    '@type': 'hahaha'
  },
  {
    name: '222',
    '@type': 'ddd'
  }])
})
```
