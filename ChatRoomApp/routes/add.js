var express = require('express');
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('ChatRoomApp.db');
var router = express.Router();

router.post('/', function(req, res, next) {
	text = req.body.text;
	name = req.session.name;
	sqlRequest = "INSERT INTO 'messages' (name, text) " +
               "VALUES('" + name + "', '" + text + "')";
	db.run(sqlRequest, function(err) {
		if(err !== null) {
			next(err);
		}
		else {
			res.redirect('back');
		}
	});
});

module.exports = router;