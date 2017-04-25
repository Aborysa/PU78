const express = require("express");
const userCoursesRouter = express.Router({mergeParams:true});
const database = require("../database.js");

const clientService = require("../services/database/client.service.js").clientService;

const utils = require("../common/utils.js");
const userError = utils.userError;
const internalError = utils.internalError;

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
    userError(res);
  }
});

userCoursesRouter.post('/usercourses', (req, res) => {
  if(req.user){
    let tokenID = req.user.data.sub;
    let courseID = req.body.id;
    let role = req.body.role;
    clientService.getClient(database).subscribe((conn) => {
      conn.query(`INSERT INTO CourseUsers(idUser_fkCourseUsers, idCourse_fkCourseUsers, courseUserRole) VALUES('${tokenID}', '${courseID}', '${role}');`,(_) => {
        if(!_)
          res.json({status:"ok"});
        else
          internalError(res);
      });
    });
  }else{
    userError(res);
  }
});

userCoursesRouter.delete('/usercourses', (req, res) => {
  if(req.user){
    let tokenID = req.user.data.sub;
    let courseID = req.body.id;
    clientService.getClient(database).subscribe((conn) => {
      conn.query(`DELETE FROM CourseUsers WHERE idUser_fkCourseUsers='${tokenID}' AND idCourse_fkCourseUsers='${courseID}';`,(_) => {
        if(!_)
          res.json({status:"ok"})
        else
          internalError(res);
        console.log(_);
      })
    });
  }else{
    userError(res);
  }
});

module.exports = userCoursesRouter;