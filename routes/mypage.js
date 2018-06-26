var express = require('express');
var router = express.Router();

router.route('/')
.get((req, res)=>{
    var sql1 = 'select * from Track where Track_id = (select F_track from Student where student_id=?)';
    var sql2 = 'select * from Track where Track_id = (select S_track from Student where student_id=?)';
    var inserts = [req.session.student_id];
    pool.query( sql1, inserts , function( err, rows1 ) {
        if (err){
                console.log(err);
                res.status(500).json({
                result: false,
                msg: "db 접속 에러",
                qry: this.sql1
            });
            return;
        }
        pool.query( sql2, inserts , function( err, rows2 ) {
            if (err){
                    console.log(err);
                    res.status(500).json({
                    result: false,
                    msg: "db 접속 에러",
                    qry: this.sql2
                });
                return;
            }
            console.log(rows1);
            console.log(rows2);
            res.render('mypage', { title: 'mypage', track1:rows1[0], track2:rows2[0] });
        });
    });
});

module.exports = router;
