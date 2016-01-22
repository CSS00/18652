var express = require('express');
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('ChatRoomApp.db');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	db.all('SELECT * FROM messages ORDER BY timestamp', function(err, row) {
		if(err !== null) {
	      next(err);
	    }
	    else {
	      console.log(row);
	      res.render('index.jade', {messages: row}, function(err, html) {
	        res.send(200, html);
	      });
	    }
	});
	// res.render('index', { title: 'FSE Chat Room', username: req.body.username});
});

module.exports = router;
