module.exports = function(conn){
    var express = require('express');
    var router = express.Router();
    var bodyParser = require('body-parser');
    var bcrypt = require('bcrypt');
    
    var passport = require('passport')
    var LocalStrategy = require('passport-local').Strategy;

    router.post('/login', (req, res)=>{
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
                    //if(!bcrypt.compareSync(password, result[0].Student_Passwd)){
                    if(password != result[0].Student_Passwd){
                        res.send('Password is not correct');
                    } else {
                        res.send('Welcome, ' + result[0].Student_Name);
                    }
                }
            }
        });
    });

    router.get('/login', (req, res)=>{
        res.render('./login');
    });

    router.get('/register', (req, res)=>{
        res.render('register')
    });

    router.post('/register', (req, res)=>{
        var userID = req.body.userID;
        var username = req.body.username;
        var password = req.body.password;

        var sql = 'INSERT INTO Student VALUES(?,?,?)';
        conn.query(sql, [userID, username, password], (err, result)=>{
            if(err){
                console.log('err : ' + err);
                res.status(500).send("Internal Server Error");
            }else{
                req.session.save(()=>{
                    res.redirect('/auth/login');
                });
            }
        });
    });

    return router;
}