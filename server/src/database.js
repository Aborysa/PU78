let nconf = require('nconf');
let db = require('node-mysql');
let DB = db.DB;


nconf.argv()
  .env('__')
  .file({ file: 'config.json' });





let database = new DB(nconf.get("database"));

module.exports = database;