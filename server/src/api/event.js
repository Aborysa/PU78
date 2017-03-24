const express = require("express");
const eventRouter = express.Router({mergeParams:true});
const database = require("../database.js");



eventRouter.get('/events', (req, res) => {
  let tokenID = req.user.data.sub;
  database.connect((conn, cb) => {
    conn.query(`SELECT * FROM Events WHERE idUsersFeide_fkEvents ='${tokenID}';`, (_,rows) =>{
      if(_){
        console.log(_);
        res.json([1234]);
      }else{
        res.json(rows);
      }
      conn.release();
    });
  });
});

eventRouter.post('/events', (req, res) => {
  let tokenID = req.user.data.sub;
  let title = req.body.title;
  let description = req.body.desc;
  let type = "personal";
  let start = req.body.startDate.slice(0,19).replace("T"," ");
  let end = req.body.endDate.slice(0,19).replace("T"," ");
  database.connect((conn, cb) => {
    conn.query(`
      INSERT INTO Events(eventTitle, eventDesc, eventType, eventStart, eventEnd, idUsersFeide_fkEvents) VALUES('${title}', '${description}', '${type}', '${start}', '${end}', '${tokenID}');`,
      (_, result) => {
        console.log(_);
        res.json({status:"ok", id:result.insertId})
        conn.release();
      });
  });
});

eventRouter.patch('/events', (req, res) => {
  let tokenID = req.user.data.sub;
  let eventID = req.body.id;
  let title = req.body.title;
  let description = req.body.desc;
  let type = "personal";
  let start = req.body.startDate.slice(0,19).replace("T"," ");
  let end = req.body.endDate.slice(0,19).replace("T"," ");
  database.connect((conn, cb) => {
    conn.query(`UPDATE Events SET eventTitle='${title}', eventDesc='${description}', eventType='${type}', eventStart='${start}', eventEnd='${end}', idUsersFeide_fkEvents='${tokenID}' WHERE idEvents='${eventID}';`,(_) => {
      console.log(_);
      conn.release();
    })
  });
  res.json({status:"ok"})
});



module.exports = eventRouter;
