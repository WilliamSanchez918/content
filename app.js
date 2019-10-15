var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

//ROUTERS
//Index Router will handle default pages
//located in (./routes/index)
//Add custom routes for custom responses
// (./routes/file.js)
var indexRouter = require('./routes/index');

//slice is using the index routing for primary use atm
var slice = require('./routes/slice');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Routes for use
//for custom routes replace 'indexRouter' with specific variable and route
//see above for custom routes (./routes/file.js)
app.use('/', indexRouter);
app.use('/locations', indexRouter);
app.use('/players', indexRouter);
app.use('/users', usersRouter);
app.use('/config', indexRouter);

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