//Require all routers

let api = require('./api.js');

let feide = require('./feide.js');

//let r_odf = require('./odf.js');

api.api.use(feide);

module.exports = api;