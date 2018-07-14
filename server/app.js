const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const favicon = require('serve-favicon');

const apiRouter = require('./routes/api');
const pagesRouter = require('./routes/pages');

const app = express();

// 设置模板引擎
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// 中间件
app.use(logger('dev'));
app.use(express.json()); // 传入数据JSON格式解析
app.use(express.urlencoded({ extended: false })); // 传入数据encode转码
app.use(cookieParser()); // 挂载cookie中间件，可以理解为实例化
app.use(favicon(path.join(__dirname, 'favicon.ico')));
app.use('/public', express.static(path.join(__dirname, 'public'))); // 提供静态资源
app.use('/static', express.static(path.join(__dirname, 'static'))); // 提供静态资源

// 路由
app.use('/api', apiRouter);
app.use('/', pagesRouter);

// 捕获404并转发到错误处理程序
app.use(function (req, res, next) {
  next(createError(404));
});

// 错误处理程序
app.use(function (err, req, res, next) {
  if (err.message.startsWith("Failed to lookup view")) {
    // 模板找不到返回404错误
    err = new Error('Not Found');
    err.status = 404;
  }
  // 设置locals, 使模板中可以直接访问
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
