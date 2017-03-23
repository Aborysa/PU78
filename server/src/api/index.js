//Require all routers

let api = require('./api.js');

let feide = require('./feide.js');
let event = require('./event.js');
let lecture = require('./lecture.js');

//let r_odf = require('./odf.js');

api.api.use(feide);
api.api.use(event);
api.api.use(lecture);

module.exports = api;

