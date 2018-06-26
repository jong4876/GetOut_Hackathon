let express = require('express');
let router = express.Router();

router.route('/')
.get((req, resp, next) => {
	// TODO: if not auth, redirect
	resp.render('manage', {title: '관리자 페이지'});
});
module.exports = router;
