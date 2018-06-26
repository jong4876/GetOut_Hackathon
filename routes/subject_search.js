var express = require('express');
var router = express.Router();

router.route('/')
.get((req, res)=>{
  console.log('query', req.query.sub_name);

  var sql = 'select * from Subject where Subject_name = ?';
  var inserts = [req.query.sub_name];

  pool.query(sql, inserts, function( err, rows ) {
    if (err){
      console.log(err);
      res.status(500).json({
        result: false,
        msg: "db 접속 에러",
        qry: this.sql
      });
      return;
    }
    console.log(rows);
    res.render('subject', { title: 'Search', data: rows });
  });
});

module.exports = router;
