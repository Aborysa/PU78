let express = require('express');
let passport  = require('passport');
let bodyParser = require('body-parser');
let cookieParser = require('cookie-parser');
let morgan = require('morgan');
let nconf = require('nconf');
let session = require('express-session');

let OICStrategy = require('passport-openid-connect').Strategy;
let User = require('passport-openid-connect').User;

const feideAPI = express();

nconf.argv()
    .env('__')
    .file({ file: 'config.json' })
    .defaults({
      "session": {
        "secret": "000"
      },
      "dataporten": {
        "enableAuthentication": false
      }
    });


feideAPI.use(session({
  secret: nconf.get('session:secret'),
  resave: false,
  saveUninitialized: false
}));


let oic = new OICStrategy(nconf.get("dataporten"));

passport.use(oic);
passport.serializeUser(OICStrategy.serializeUser)
passport.deserializeUser(OICStrategy.deserializeUser)

feideAPI.use(passport.initialize());
feideAPI.use(passport.session());

feideAPI.get('/login', passport.authenticate('passport-openid-connect', {"successReturnToOrRedirect": "/"}));
feideAPI.get('/callback', passport.authenticate('passport-openid-connect', {"callback": true, "successReturnToOrRedirect": "/"}));

feideAPI.get('/user', (req, res) => {
  res.json({
    "hello": "world",
    "user": req.user
  })
})

module.exports = feideAPI;