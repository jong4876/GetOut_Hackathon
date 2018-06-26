var express = require('express');
var router = express.Router();

router.route('/')
.get((req, res)=>{
    var sql1 = 'select * from Track where Track_id = (select F_track from Student where student_id=?)';
    var sql2 = 'select * from Track where Track_id = (select S_track from Student where student_id=?)';
    var basic_countsql = 'select count(*) as total from Subject where Track_Name rlike ';
    var app_countsql = 'select count(*) as total from Subject where Track_Name rlike ';
    var basic_mysql = 'select count(*) as total from Fin_Subject where Fin_Student_id = ? and Fin_Subject_id in (select Subject_id from Subject where Track_Name rlike';
    var app_mysql = 'select count(*) as total from Fin_Subject where Fin_Student_id = ? and Fin_Subject_id in (select Subject_id from Subject where Track_Name rlike';
    var inserts = [req.session.student_id];
    var ftrack = '';
    var strack = '';
    var frlike = '';
    var srlike = '';

    pool.query( sql1, inserts , function( err, rows1 ) {
        if (err){
                console.log(err);
                res.status(500).json({
                result: false,
                qry: this.sql1
            });
            return;
        }
        pool.query( sql2, inserts , function( err, rows2 ) {
            if (err){
                    console.log(err);
                    res.status(500).json({
                    result: false,
                    qry: this.sql2
                });
                return;
            }
            pool.query( 'select F_track from Student where student_id=?',inserts , function( err, frow ) {
                if (err){
                    console.log(err);
                    res.status(500).json({
                        result: false,
                        qry: this.sql
                    });
                    return;
                }
                else if (frow.length == 0)
                {
                    res.redirect('/login');
                    return;
                }
                ftrack += frow[0].F_track;
                pool.query( 'select S_track from Student where student_id=?',inserts , function( err, srow ) {
                    if (err){
                            console.log(err);
                            res.status(500).json({
                            result: false,
                            qry: this.sql
                        });
                        return;
                    }
                    strack += srow[0].S_track;
                    if(ftrack==1)
                      frlike +="'1.........'";
                    else if(ftrack==2)
                      frlike +="'.1........'";
                    else if(ftrack==3)
                      frlike +="'..1.......'";
                    else if(ftrack==4)
                      frlike +="'...1......'";
                    else if(ftrack==5)
                      frlike +="'....1.....'";
                    else if(ftrack==6)
                      frlike +="'.....1....'";
                    else if(ftrack==7)
                      frlike +="'......1...'";
                    else if(ftrack==8)
                      frlike +="'.......1..'";
                    else if(ftrack==9)
                      frlike +="'........1.'";
                    else if(ftrack==10)
                      frlike +="'.........1'";

                    if(strack==1)
                      srlike +="'1.........'";
                    else if(strack==2)
                      srlike +="'.1........'";
                    else if(strack==3)
                      srlike +="'..1.......'";
                    else if(strack==4)
                      srlike +="'...1......'";
                    else if(strack==5)
                      srlike +="'....1.....'";
                    else if(strack==6)
                      srlike +="'.....1....'";
                    else if(strack==7)
                      srlike +="'......1...'";
                    else if(strack==8)
                      srlike +="'.......1..'";
                    else if(strack==9)
                      srlike +="'........1.'";
                    else if(strack==10)
                      srlike +="'.........1'";
                    basic_countsql += frlike;
                    app_countsql += srlike;
                    basic_mysql += frlike += ')';
                    app_mysql += srlike +=')';
                    pool.query( basic_countsql, function( err, basic_count_rows ) {
                        if (err){
                                console.log(err);
                                res.status(500).json({
                                result: false,
                                msg: "db 접속 에러",
                                qry: this.sql
                            });
                            return;
                        }
                        console.log(basic_countsql);
                        console.log(basic_count_rows);
                        pool.query( app_countsql , function( err, app_count_rows ) {
                            if (err){
                                    console.log(err);
                                    res.status(500).json({
                                    result: false,
                                    msg: "db 접속 에러",
                                    qry: this.sql
                                });
                                return;
                            }
                            console.log(app_count_rows);
                            pool.query( basic_mysql, inserts, function( err, basic_mysql_rows ) {
                                if (err){
                                        console.log(err);
                                        res.status(500).json({
                                        result: false,
                                        msg: "db 접속 에러",
                                        qry: this.sql
                                    });
                                    return;
                                }
                                console.log(basic_mysql_rows);
                                pool.query( app_mysql, inserts, function( err, app_mysql_rows ) {
                                    if (err){
                                            console.log(err);
                                            res.status(500).json({
                                            result: false,
                                            msg: "db 접속 에러",
                                            qry: this.sql
                                        });
                                        return;
                                    }
                                    console.log(app_mysql_rows);
                                    console.log('basicper', basic_mysql_rows, basic_count_rows);
                                    var basicper;
                                    if (basic_count_rows.length == 0 || basic_mysql_rows.length == 0)
                                        basicper = 0;
                                    else
                                        basicper = basic_mysql_rows[0].total/basic_count_rows[0].total;
                                    
                                    var appper = app_mysql_rows[0].total/app_count_rows[0].total;
                                    console.log(rows1);
                                    console.log(rows2);
                                    console.log(basicper);
                                    console.log(appper);
                                    res.render('mypage', { title: 'mypage', track1:rows1[0], track2:rows2[0], basic_per:basicper*100, app_per:appper*100 });
                                });
                            });
                        });
                    });
                });
            });
        });
    });
});

module.exports = router;
