const express = require("express");
const courseRouter = express.Router({mergeParams:true});
const database = require("../database.js");


courseRouter.get('/courses', (req,res) => {
  let tokenID = req.user.data.sub;
  database.connect((conn, cb) => {
    conn.query(
      `select * from CourseUsers where idUser_fkCourseUsers = '${tokenID}';`,
      (_,rows) => {
        if (!_) {
          res.json(rows);
        } else {
          console.log(_);
          res.json([1234]);
        };
      }
    );
  });
});

module.exports = courseRouter;