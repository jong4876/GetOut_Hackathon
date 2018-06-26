module.exports = function(conn){
    var express = require('express');
    var router = express.Router();
    var bodyParser = require('body-parser');
    var bcrypt = require('bcrypt-nodejs');

    router.post('/', (req, res)=>{
        var userID = req.body.userID;
        var password = req.body.password;

        var sql = 'SELECT * FROM Student WHERE Student_Id=?';
        conn.query(sql, [userID], (err, result)=>{
            if(err){
                console.log('err : ' + err);
                res.status(500).send("Internal Server Error");
            } else {
                if(result.length === 0){
                    res.send('User Not Found');
                } else {
                    if(password === result[0].Student_Passwd){
                        req.session.authID = userID;
                        req.session.save(()=>{
                            res.redirect('/track');
                        });
                    } else {
                        res.redirect('/login');
                    }
                }
            }
        });
    });

    router.get('/', (req, res)=>{
        if(req.session.authID){
            res.redirect('/track');
        } else {
            res.render('./login', {authID: req.session.authID});
        }
    });

    return router;
}