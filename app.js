var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var squadRouter = require('./routes/squad');
var sprintplanRouter = require('./routes/sprintplan');
var tasksprintupdate = require('./routes/tasksprintupdate');
var task = require('./routes/task');


var app = express();
// const port = 3000;
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
const { auth } = require('express-openid-connect');

const config = {
  authRequired: true,
  auth0Logout: true,
  secret: '97826738c07eec91c419b70191d0396af8165e0f55519a2ead639500878fb95c',
  baseURL: 'http://localhost:3000',
  clientID: 'MfwsKuu006nwnaagApJnhEa6JRt9Rism',
  issuerBaseURL: 'https://dev-chpoz9x4.eu.auth0.com'
};

// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config));
app.use(function (req, res, next) {
  res.locals.user = req.oidc.user;
  next();
});

// req.isAuthenticated is provided from the auth router
// app.get('/', (req, res) => {
//   res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
// });
app.use('/', indexRouter);
app.use('/sr', squadRouter);
app.use("/board", sprintplanRouter);
app.use('/tasksprintupdate', tasksprintupdate);
app.use('/task', task);


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
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
