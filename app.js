var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var cors = require('cors');

const route = require('./routes/app.js');
const userRoute = require ('./routes/user.js');
const cartRoute = require ('./routes/cart.js');
const proizvodiRoute = require ('./routes/proizvodi.js');
const jobRoute = require ('./routes/job.js');


var app = express();

mongoose.connect('mongodb://localhost:27017/unixprom');

mongoose.connection.on('connected', ()=>{
  console.log("Connected to db!");
});

mongoose.connection.on('error', (err)=>{
  console.log("Error, lost conncection ->" + err);
});

 const PORT = 3000;

 app.use(cors());

 app.get('/', (req, res)=>{
   res.send("Hello body :D");
 });

 app.listen(PORT, ()=>{
   console.log('Server run on port ' + PORT);
 });

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PATCH, DELETE, OPTIONS');
  next();
});

app.use('/api', route);
app.use('/api', cartRoute); 
app.use('/api', proizvodiRoute);
app.use('/api', userRoute);
app.use('/api', jobRoute);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  res.render('index');
});

module.exports = app;
