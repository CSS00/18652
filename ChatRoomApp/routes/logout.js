var express = require('express');
var router = express.Router();

router.all('/', function(req, res, next) {
	req.session.user = null;
	req.session.loggedIn = false;
	res.redirect('/');
});

module.exports = router;
