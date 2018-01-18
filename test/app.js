var express = require('express');
var app = express();
var path = require('path');
//app.use(express.static(path.join(__dirname, 'public')));
var JSONLD = require('../index.js');
JSONLD({
  app,
  indexPath: path.join(__dirname, 'public/index.html')
})
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
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
