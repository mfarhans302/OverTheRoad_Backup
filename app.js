var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require("dotenv").config();
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var tripsRouter = require('./routes/trip');
var userInfoRouter = require('./routes/userInfo');
const companyInfoRouter = require('./routes/companyInfo')
const permitRoute = require('./routes/permitRoute')
const walletRouter = require("./routes/walletRoutes")
const transactionRoute = require("./routes/transactionRoutes")
var app = express();
const connectDb = require('./config/db');
const companyInfo = require('./controllers/companyInfo');
const reportsRouter = require('./routes/reportsRoutes');
const baseAPIUrl = `/api/${process.env.API_VER}`;
connectDb()
// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use(`${baseAPIUrl}/users`, usersRouter);
app.use(`${baseAPIUrl}/trips`, tripsRouter);
app.use(`${baseAPIUrl}/userInfo`, userInfoRouter);
app.use(`${baseAPIUrl}/companyInfo`, companyInfoRouter);
app.use(`${baseAPIUrl}/permitLogBook`, permitRoute)
app.use(`${baseAPIUrl}/reports`, reportsRouter)
app.use(`${baseAPIUrl}`,walletRouter)
app.use(`${baseAPIUrl}`, transactionRoute)


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  // res.render('error');
  return res.json({ error: "internal server error" })
});

module.exports = app;
