require('dotenv').config();
require('./config/mongodb'); // database initial setup

const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const hbs = require('hbs');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const logger = require('morgan');
const mongoose = require('mongoose');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const authRouter = require('./routes/auth');
const recipesPageRouter = require('./routes/recipesPageRoutes');
const plannerRoutes = require('./routes/plannerRoutes');
const planner2Routes = require('./routes/planner2Routes');
const app = express();

// SESSION SETUP
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    cookie: { maxAge: 100000 }, // in millisec
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
    saveUninitialized: true,
    resave: true,
  })
);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
hbs.registerPartials(__dirname + '/views/partials');

//CUSTOM MIDDLEWARES
app.use(require('./middlewares/loginStatus'));

app.use('/', indexRouter);
app.use('/', usersRouter);
app.use('/', authRouter);
app.use('/', recipesPageRouter);
app.use('/', plannerRoutes);
app.use('/', planner2Routes);

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
  res.render('error');
});

module.exports = app;
