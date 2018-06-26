module.exports = function(conn){
    var express = require('express');
    var router = express.Router();

    router.post('/', (req, res)=>{
        delete req.session.authID;
        req.session.save(()=>{
            res.redirect('/login');
        });
    });

    return router;
}