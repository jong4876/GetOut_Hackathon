var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var bcrypt = require('bcrypt-nodejs');

router.route('/')
.get((req, res) => {
	res.render('./login', {authID: req.session.student_id});
})
.post((req, res) => {
	var userID = req.body.userID;
	var password = req.body.password;
	console.log('login', userID, password);

	var sql = 'SELECT * FROM Student WHERE Student_Id=? and Student_Passwd=?';
	pool.query(sql, [userID, password], (err, result) => {
		if (err)
		{
			console.log('err: ' + err);
			res.status(500).send(err);
		} 
		else 
		{
			if(result.length === 0)
			{
				res.send('User Not Found');
			}
			else 
			{
				if (password === result[0].Student_Passwd)
				{
					var student_name = result[0].Student_Name;

					req.session.student_id = userID;
					req.session.student_name = student_name;
					
					res.redirect('/index');
				}
				else
				{
					res.send('Password is not correct');
				}
			}
		}
	});
});

module.exports = router;
