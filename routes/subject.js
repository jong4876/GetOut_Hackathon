var express = require('express');
var router = express.Router();

router.route('/')
.get((req, res)=>{
  pool.query('select * from Subject', function(err, rows) {
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
    res.render('subject', { title: 'Subject', data:rows});
  });
});


module.exports = router;
