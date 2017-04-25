const express = require("express");
const userCoursesRouter = express.Router({mergeParams:true});
const database = require("../database.js");

const clientService = require("../services/database/client.service.js").clientService;

let defaultError = (res) => {
  res.status(400);
  res.json({
    status: "error",
    message: "User not logged in!"
  });
}

userCoursesRouter.get('/usercourses', (req,res) => {
  if(req.user){
    let tokenID = req.user.data.sub;
    clientService.getClient(database).subscribe((conn) => {
      conn.query(
        `select * from CourseUsers join Courses on idCourse_fkCourseUsers=idCourse where idUser_fkCourseUsers = '${tokenID}';`,
        (_,rows) => {
          if (!_) {
            res.json(rows);
          } else {
            res.status(500);
            res.json({
              status: "error",
              message: "Something went wrong!"
            });
          };
        }
      );
    });
  }else{
    defaultError(res);
  }
});

userCoursesRouter.post('/usercourses', (req, res) => {
  if(req.user){
    let tokenID = req.user.data.sub;
    let courseID = req.body.id;
    let role = req.body.role;
    clientService.getClient(database).subscribe((conn) => {
      conn.query(`INSERT INTO CourseUsers(idUser_fkCourseUsers, idCourse_fkCourseUsers, courseUserRole) VALUES('${tokenID}', '${courseID}', '${role}');`,(_) => {
      })
    });
    res.json({status:"ok"});
  }else{
    defaultError(res);
  }
});

userCoursesRouter.delete('/usercourses', (req, res) => {
  let tokenID = req.user.data.sub;
  let courseID = req.body.id;
  clientService.getClient(database).subscribe((conn) => {
    conn.query(`DELETE FROM CourseUsers WHERE idUser_fkCourseUsers='${tokenID}' AND idCourse_fkCourseUsers='${courseID}';`,(_) => {
      console.log(_);
    })
  });
  res.json({status:"ok"})
})

module.exports = userCoursesRouter;