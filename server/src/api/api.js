let express = require('express');
let apiBase = express.Router();
let apiRouter = express.Router({mergeParams: true});

apiBase.use('/api/v1',apiRouter);

module.exports.base = apiBase;
module.exports.api = apiRouter;
