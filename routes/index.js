var express = require('express');
var session = require('express-session');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {

    var notice = [];
    var Subject_Name1 = [];// 1학년의 트랙 과목들
    var Subject_Name2 = [];// 2학년의 트랙 과목들
    var Subject_Name3 = [];
    var Subject_Name4 = [];
    var Result = [];

    var sql = 'SELECT * FROM Notice';
    pool.query(sql, (err, rows) => {
      if (err) {
         console.log(err);
      } else {
        console.log(rows);
        res.render('index', {authID: req.session.student_id, notices: rows});
      }
    });

});
module.exports = router;