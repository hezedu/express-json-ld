# express-json-ld
非中间件
## 使用方法
#### 安装：
```js
var express = require('express');
var app = express();
var JSONLD = require('express-json-ld');

JSONLD({
  app,
  indexPath: path.join(__dirname, 'public/index.html')
})
```
#### 使用：
```js
app.get('/', function(req ,res, next){
  res.JSONLD([{
    name: 'JSON-LD',
    '@type': 'hahaha'
  },
  {
    name: '222',
    '@type': 'ddd'
  }])
})
```
#### 模版：

使用 `<!--JSON-LD-PLACEHOLDER-->` 占位符代表JSON-LD输出位置。<br>
使用 `<!--JSON-LD-TITLE-->` 占位符代表根据JSON-LD生成的Title位置。
```html
<!DOCTYPE html>
<html>
  <head>
    <meta http-equiv="Content-type" content="text/html; charset=utf-8">
    <link rel="shortcut icon" href="https://hezedu.github.io/clear/dist/static/favicon.png"/>

    <!--JSON-LD-PLACEHOLDER-->
    <title><!--JSON-LD-TITLE--></title>

  </head>
  <body>
    <h1>JSON-LD</h1>
  </body>
</html>
```
## 最终输出：
```html
<!DOCTYPE html>
<html>
  <head>
    <meta http-equiv="Content-type" content="text/html; charset=utf-8">
    <link rel="shortcut icon" href="https://hezedu.github.io/clear/dist/static/favicon.png"/>

    <script type="application/ld+json" id="json-ld-hahaha">{"name":"JSON-LD","@type":"hahaha"}</script>
    <script type="application/ld+json" id="json-ld-ddd">{"name":"222","@type":"ddd"}</script>
    <title>222-JSON-LD</title>

  </head>
  <body>
    <h1>JSON-LD</h1>
  </body>
</html>

```
