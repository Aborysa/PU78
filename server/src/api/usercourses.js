const express = require("express");
const userCoursesRouter = express.Router({mergeParams:true});
const database = require("../database.js");


userCoursesRouter.get('/usercourses', (req,res) => {
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

userCoursesRouter.post('/usercourses', (req, res) => {
  let tokenID = req.user.data.sub;
  let courseID = req.body.id;
  let role = req.body.role;
  database.connect((conn, cb) => {
    conn.query(`INSERT INTO CourseUsers(idUser_fkCourseUsers, idCourse_fkCourseUsers, courseUserRole) VALUES('${tokenID}', '${courseID}', '${role}');`,(_) => {
      console.log(_);
    })
  });
  res.json({status:"ok"})
});

userCoursesRouter.delete('/usercourses', (req, res) => {
  let tokenID = req.user.data.sub;
  let courseID = req.body.id;
  database.connect((conn, cb) => {
    conn.query(`DELETE FROM CourseUsers WHERE idUser_fkCourseUsers='${tokenID}' AND idCourse_fkCourseUsers='${courseID}';`,(_) => {
      console.log(_);
    })
  });
  res.json({status:"ok"})
})

module.exports = userCoursesRouter;