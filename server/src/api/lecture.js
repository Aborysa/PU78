const express = require("express");
const lectureRouter = express.Router({mergeParams:true});
const database = require("../database.js");


lectureRouter.get('/lectures', (req,res) => {
  let tokenID = req.user.data.sub;
  database.connect((conn, cb) => {
    conn.query(
      `SELECT Lectures.*, GROUP_CONCAT(startWeek,"-",endWeek) AS 'weeks'
      FROM Lectures, LectureWeeks, CourseUsers
      WHERE idUser_fkCourseUsers='${tokenID}'
      AND idCourse_fkCourseUsers=idCourse_fkLectures
      AND idLectures=idLecture_fkLectureWeeks=idLectures
      GROUP BY idLectures;`,
      (_,rows) => {
        if (!_) {
          console.log(rows);
          //var lecturesjson = json.parse(rows);
          //console.log(lecturesjson);
          //delete lecturesjson["weeks"];
          //lecturesjson["weeks"] = rows[0].weeks.split;
          //res.json(lecturesjson);
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