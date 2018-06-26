var express = require('express');
var router = express.Router();

/* GET home page. */
router.route('/')
.get((req, res, next) => {
	var sql = 'SELECT * FROM Notice';
	pool.query(sql, (err, notices_rows) => {
		if (err)
		{
			console.log(err);
		}
		else
		{
			var sql = 'SELECT * FROM Fin_Subject WHERE ';
			pool.query(sql, (err, fin_subject_rows) => {
				if (err)
				{
					console.log(err);
				}
				else
				{
					res.render('index', {
						title: 'index',
						authID: req.session.student_id,
						notices: notices_rows,
						fin_subjects: fin_subject_rows,
					});
				}
			})
		}
	});
});

module.exports = router;
