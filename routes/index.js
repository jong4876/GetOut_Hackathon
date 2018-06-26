var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) 
{
	var sql = 'SELECT * FROM Notice';
	pool.query(sql, (err, rows) => {
		if (err)
		{
			console.log(err);
		}
		else
		{
			res.render('index', {
				title: 'Express', 
				authID: req.session.student_id,
				notices: rows,
			});
		}
	})
});

module.exports = router;
