var express = require('express');
var router = express.Router();
var app = express();
var fs = require('fs');

router.route('/')
.get((req, res)=>{
    pool.query( 'select * from Student' , function( err, rows ) {
        if (err){
                console.log(err);
                res.status(500).json({
                result: false,
                msg: "db 접속 에러",
                qry: this.sql
            });
            return;
        }
        console.log(rows[0]);
        if( rows.length === 0 ){
            res.status(200).json({
                result: false,
                msg: "멤버가 없습니다.",
            });
        }else{

            res.status(200).json({
                result: false,
                        msg: "멤버입니다",
                        data: rows
            });
        }
    });
});
module.exports = router;
