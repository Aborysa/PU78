//Require all routers

let api = require('./api.js');

let feide = require('./feide.js');
let event = require('./event.js');

//let r_odf = require('./odf.js');

api.api.use(feide);
api.api.use(event);

module.exports = api;

