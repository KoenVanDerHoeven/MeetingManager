var express = require('express');
var router = express.Router();
var db = require('../db/user');

var validDetails = function (username, password, callback) {
  db.getByUsername(username, function (error, users) {
    if (error) {
      callback(error);
    }
    // If username exists in the server
    if (users.length !== 0) {
      // Check if passwords match
      if (users[0].password === password) {
        callback(true);
      } else {
        callback(false);
      }
    } else {
      callback(false);
    }
  });
};

// Get request
router.get('/login', function (req, res, next) {
  res.render('login');
});

// Post request
router.post('/login', function (req, res) {
  validDetails(req.body.username, req.body.password, function (validDetail) {
    if (validDetail === true) {
      res.redirect('/success');
    } else {
      res.redirect('/login');
    }
  });
});

module.exports = router;
