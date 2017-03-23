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

courseRouter.post('/events', (req, res) => {
  let tokenID = req.user.data.sub;
  let courseid = req.body.course;
  let role = req.body.courserole;
  database.connect((conn, cb) => {
    conn.query(`INSERT INTO CourseUsers(idUser_fkCourseUsers, idCourse_fkCourseUsers, courseUserRole) VALUES('${tokenID}', '${courseid}', '${role}');`,(_) => {
      console.log(_);
    })
  });
  res.json({status:"ok"})
});

module.exports = courseRouter;