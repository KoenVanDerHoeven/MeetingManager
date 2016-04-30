var express = require('express');
var router = express.Router();
var db = require('../db/user');

var doesntExist = function (username, password, callback) {
  // Check if username already exists
  db.getByUsername(username, function (error, users) {
    if (error) {
      callback(error);
    }
    // Check if username exists
    if (users.length !== 0) {
      callback(false);
    } else {
      db.createAccount(username, password, function (error, users) {
        if (error) {
          callback(error);
        }
        callback(true);
      });
    }
  });
};

// Implement the routes.
// Get request
router.get('/newaccount', function (req, res, next) {
  res.render('newaccount');
});

// Post request
router.post('/newaccount', function (req, res) {
  doesntExist(req.body.username, req.body.password, function (validDetail) {
    if (validDetail === true) {
      res.redirect('/');
    } else {
      res.redirect('/newaccount');
    }
  });
});

module.exports = router;
