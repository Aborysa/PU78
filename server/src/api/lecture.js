const express = require("express");
const lectureRouter = express.Router({mergeParams:true});
const database = require("../database.js");

const clientService = require("../services/database/client.service.js").clientService;



lectureRouter.get('/lectures/:code', (req,res) => {
  let course = req.params.code;
  database.connect((conn, cb) => {
    conn.query(
      `select Lectures.*, GROUP_CONCAT(startWeek,"-",endWeek) AS 'weeks' 
        from Lectures join LectureWeeks on idLectures=idLecture_fkLectureWeeks where idCourse_fkLectures = '${course}' group by idLectures;`,
      (_,rows) => {
        if (!_) {
          res.json(rows);
        } else {
          console.log(_);
          res.json([1234]);
        };
        conn.release();
      }
    );
  });
});

lectureRouter.get('/lectures', (req,res) => {
  let tokenID = req.user.data.sub;
  clientService.getClient(database).subscribe((conn) => {
    conn.query(
      `select Lectures.*, GROUP_CONCAT(startWeek,"-",endWeek) AS 'weeks' from Lectures join CourseUsers on idCourse_fkCourseUsers=idCourse_fkLectures join LectureWeeks on idLectures=idLecture_fkLectureWeeks where idUser_fkCourseUsers = '${tokenID}' group by idLectures;`,
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

module.exports = lectureRouter;