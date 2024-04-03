var express = require('express');
var logger = require('morgan');
var mongoose = require('mongoose')
var cors = require('cors')

// var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var authRouter = require('./routes/auth');
var treatmentRouter = require('./routes/treatment');
var promoRouter = require('./routes/promo')

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.set('trust proxy', 1);
app.enable('trust proxy');

app.use(
    cors({
      origin: [process.env.REACT_APP_URI, 'http//localhost:4000', 'http://localhost:5173', ]  // <== URL of our future React app
    })
  );

// app.use(
//     cors()
//   );

// app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/treatments', treatmentRouter);
app.use('/promo', promoRouter)
app.use('/auth', authRouter);

mongoose
  .connect(process.env.MONGODB_URI)
  .then((x) => console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`))
  .catch((err) => console.error("Error connecting to mongo", err));

module.exports = app;
