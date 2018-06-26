var express = require('express');
var router = express.Router();

router.route('/')
.post((req, res) => {
    delete req.session.authID;
    req.session.save(() => {
        res.redirect('/login');
    });
});

module.exports = router;
