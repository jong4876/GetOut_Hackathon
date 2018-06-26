var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var bcrypt = require('bcrypt-nodejs');

router.route('/')
.get((req, res) => {
    res.render('./register');
})
.post((req, res) => {
    var userID = req.body.userID;
    var username = req.body.username;
    var password = req.body.password;

    //bcrypt.hash(password, null, null, (err, hash)=>{
    var sql = 'INSERT INTO Student VALUES(?,?,?)';
    pool.query(sql, [userID, username, password], (err, result)=>{
        if(err){
            console.log('err : ' + err);
            res.status(500).send("Internal Server Error");
        }else{
            console.log(result);
            req.session.authID = userID;
            req.session.save(()=>{
                res.redirect('/login');
            });
        }
    });
    //});
});

module.exports = router;
