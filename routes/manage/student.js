let util = require('util');
let express = require('express');
let router = express.Router();
let TABLE = 'Student';

let error_handler = (error) => {
	console.log('error:', error);
};
let success_handler = (result) => {
	console.log('result:', result);
};

router.route('/')
.get((req, resp, next) => {
	let sql = util.format('SELECT * FROM %s', TABLE);
	pool.query(sql, (error, rows) => {
		if (error)
			error_handler(error);
		else
		{
			success_handler(rows);
			resp.render('manage_student', {title: 'Manage Students', rows: rows});
		}
	});

	
})
.post((req, resp, next) => {
	let sql = util.format('insert into %s values(%s, %s, %s)', 
		TABLE, req.body.id, req.body.name, req.body.pw);

	pool.query(sql, (error, result) => {
		if (error)
			error_handler(error);
		else
			success_handler(result);
		resp.redirect('student');
	});
});

module.exports = router;
