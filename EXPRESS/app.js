const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const passport = require('passport');

require('./auth/auth');

//require routes
const indexRouter = require('./routes/index');
const bookingsRouter = require('./routes/bookings.route');
const roomsRouter = require('./routes/rooms.route');
const contactRouter = require('./routes/contact.route');
const usersRouter = require('./routes/users.route');
const loginRouter = require('./routes/login.route');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

//routes
//app.use('/', loginRouter);
app.use('/login', loginRouter);
app.use('/bookings', passport.authenticate('jwt', { session: false }), bookingsRouter);
app.use('/rooms', passport.authenticate('jwt', { session: false }), roomsRouter);
app.use('/contact', passport.authenticate('jwt', { session: false }), contactRouter);
app.use('/users', passport.authenticate('jwt', { session: false }), usersRouter);

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
