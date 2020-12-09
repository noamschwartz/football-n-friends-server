var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require("cors");

var app = express();

app.use(cors());

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var teamsRouter = require('./routes/teams');
var contestRouter = require('./routes/contests');
var signupRouter = require('./routes/signup');
var signinRouter = require('./routes/signIn');
var myProfileRouter = require('./routes/myProfile');
var newAnalysisRouter = require('./routes/newAnalysis');
var fixturesRouter = require('./routes/fixtures');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/teams', teamsRouter);
app.use('/contests', contestRouter);
app.use('/signup', signupRouter);
app.use('/signIn', signinRouter);
app.use('/myProfile', myProfileRouter);
app.use('/newAnalysis', newAnalysisRouter);
app.use('/fixtures', fixturesRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  // res.status(err.status || 500);
  res.status(500).json(err.message);
});

module.exports = app;
