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
                        res.send('Welcome, ' + result[0].Student_Name);
                    } else {
                        res.send('Password is not correct');
                    }
                }
            }
        });
    });

    router.get('/', (req, res)=>{
        res.render('./login', {authID: req.session.authID});
    });

    router.post('/logout', (req, res)=>{
        delete req.session.authID;
        req.session.save(()=>{
            res.redirect('/login');
        });
    });

    return router;
}