module.exports = function(){
    var express = require('express');
    var router = express.Router();
    var bodyParser = require('body-parser');

    router.get('/', (req, res)=>{
        if(req.session.authID){
            delete req.session.authID
            req.session.save(()=>{
                res.redirect('/login');
            });
        } else {
            res.redirect('/login');
        }
    });

    router.post('/', (req, res)=>{
        if(req.session.authID){
            delete req.session.authID
            req.session.save(()=>{
                res.redirect('/login');
            });
        } else {
            res.redirect('/login');
        }
    });

    return router;
}