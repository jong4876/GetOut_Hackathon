var express = require('express');
var router = express.Router();
var app = express();
var fs = require('fs');

router.route('/')
.get((req, res)=>{
    pool.query( 'select * from Subject' , function( err, rows ) {
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

router.route('/search')
.post((req, res)=>{
    var sql, inserts;

    console.log(req.body.sub_name);

    sql = 'select * from Subject where Subject_name = ?';
    inserts = [req.body.sub_name];

    pool.query(sql, inserts  , function( err, rows ) {
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
