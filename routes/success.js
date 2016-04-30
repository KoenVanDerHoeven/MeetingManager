var express = require('express');
var router = express.Router();

// Implement the routes.
// Get request
router.get('/success', function (req, res, next) {
  res.render('success');
});

// Post request
router.post('/success', function (req, res) {
  res.redirect('/success');
});

module.exports = router;
