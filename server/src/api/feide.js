let express = require('express');
let passport  = require('passport');
let bodyParser = require('body-parser');
let cookieParser = require('cookie-parser');
let morgan = require('morgan');
let nconf = require('nconf');
let session = require('express-session');

let bz_router = express.Router({mergeParams:true});
let api = require('./api.js');
let apiRouter = api.api;

let OICStrategy = require('passport-openid-connect').Strategy;
let User = require('passport-openid-connect').User;

let database = require("../database.js");


const feideAPI = express.Router({mergeParams:true});

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

console.log(nconf.get("database"));feideAPI.use(session({
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
feideAPI.get('/callback', passport.authenticate('passport-openid-connect', {"callback": true}),(req,res)=>{
  let tokenID = req.user.data.sub;
  database.connect((conn, cb) => {
    console.log("connected")
    conn.query(`SELECT EXISTS(SELECT * FROM Users WHERE idUsersFeide ='${tokenID}') AS userexists;`, (_,rows) =>{
      console.log(rows[0].userexists);
      if (rows[0].userexists == 0) {
        conn.query(`INSERT INTO Users(idUsersFeide) VALUES ('${tokenID}');`);
      }
      conn.close();
    });
  });
  res.redirect('/home');
});

feideAPI.get('/user', (req, res) => {
  res.json(req.user || {});
});

feideAPI.get('/logout',(req,res) => {
  req.logout();
  req.session.destroy(function (err) {
    res.redirect('/');
  });
});

module.exports = feideAPI;