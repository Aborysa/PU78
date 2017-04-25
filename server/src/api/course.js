const express = require("express");
const courseRouter = express.Router({mergeParams:true});
const database = require("../database.js");

const clientService = require("../services/database/client.service.js").clientService;

const utils = require("../common/utils.js");
const internalError = utils.internalError;

courseRouter.get('/course', (req,res) => {
  let search = req.query.q;
  clientService.getClient(database).subscribe(conn => {
    conn.query(
      `SELECT * FROM Courses WHERE idCourse LIKE '%${search}%' LIMIT 10;`,
      (_,rows) => {
        if (!_) {
          res.json(rows);
        } else {
          internalError(res);
        };
      }
    );
  });
});

module.exports = courseRouter;