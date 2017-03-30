let express = require('express');
let path = require('path');
let favicon = require('serve-favicon');
let logger = require('morgan');
let cookieParser = require('cookie-parser');
let bodyParser = require('body-parser');
let passport = require('passport');
let nconf = require('nconf');
let api = require('./api/index.js');




let app = express();

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());



app.use(api.base);
app.use(express.static(path.resolve(__dirname, '../public')));


// catch 404 and forward to error handler

app.use(function(req, res, next) {
  res.sendFile(path.resolve(__dirname,'../public/index.html'));
});


module.exports = app;
