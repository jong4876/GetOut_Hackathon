var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {

  var notice = [];
    var Subject_Name1 = [];// 1학년의 트랙 과목들
    var Subject_Name2 = [];// 2학년의 트랙 과목들
    var Subject_Name3 = [];
    var Subject_Name4 = [];
    var Result = [];

    var sql1 = 'SELECT * FROM Notice';
    pool.query(sql1, (err, notices_rows) => {
      if (err) {
       console.log(err);
     } else {
      var sql2 = 'SELECT * FROM Fin_Subject WHERE Fin_Student_Id = ?';
      pool.query(sql2, [req.session.student_id], (err, fin_subject_rows) => {
        if (err)
        {
          console.log(err);
        }
        else
        {
          var sql3 = 'SELECT * FROM Student WHERE Student_Id = ?';
          console.log('sql3', sql3);
          pool.query(sql3, [req.session.student_id], (err, student_rows) => {
            if (err)
            {
              console.log(err);
            }
            else
            {
              console.log('notices_rows', notices_rows);
              console.log('student_rows', student_rows);

              if (student_rows.length > 0)
                var username = student_rows[0].Student_Name;
              else
                var username = 'Guest';
              
              res.render('index', {
                title: 'index',
                authID: req.session.student_id,
                username: username,
                notices: notices_rows,
                fin_subjects: fin_subject_rows,
              });
            }
          })
        }
      });
    }
  });

  });
module.exports = router;