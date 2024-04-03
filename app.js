var express = require('express');
var logger = require('morgan');
var mongoose = require('mongoose')
var cors = require('cors')
var bodyParser = require('body-parser')

// var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var authRouter = require('./routes/auth');
var treatmentRouter = require('./routes/treatments');
var promoRouter = require('./routes/promo')
var photosRouter = require('./routes/photos')

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json({ limit: '40mb' }));
app.use(bodyParser.urlencoded({ limit: '40mb', extended: true }));

app.set('trust proxy', 1);
app.enable('trust proxy');

app.use(
    cors({
      origin: [process.env.REACT_APP_URI]  // <== URL of our future React app
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
app.use("/photos", photosRouter)

mongoose
  .connect(process.env.MONGODB_URI)
  .then((x) => console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`))
  .catch((err) => console.error("Error connecting to mongo", err));

module.exports = app;
