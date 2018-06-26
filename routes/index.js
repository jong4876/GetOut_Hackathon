var express = require('express');
var router = express.Router();

var conn = require('../config/db')();

var login = require('./auth/login')(conn);
router.use('/login', login);

var register = require('./auth/register')(conn);
router.use('/register', register);

var logout = require('./auth/logout');
router.use('/logout', logout);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
