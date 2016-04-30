var express = require('express');
var router = express.Router();
var db = require('../db/voting');

var makeVote = function (votingRoom, person, callback) {
  db.getVotesByUser(votingRoom, person, function (error, rooms) {
    if (error) {
      callback(error);
    }
    // Check if the person exists
    if (rooms.length !== 0) {
      console.log(rooms[0].vote);
      console.log('Person already exists, adding a vote');
      db.updateAccount(votingRoom, person, rooms[0].vote + 1, function (error) {
        if (error) {
          callback(error);
        }
        console.log('Voted for ' + person + ' in room ' + votingRoom);
        callback(true);
      });
      callback(false);
    } else {
      db.createAccount(votingRoom, person, 1, function (error, rooms) {
        if (error) {
          callback(error);
        }
        console.log('Voted for ' + person + ' in room ' + votingRoom);
        callback(true);
      });
    }
  });
};

// Implement the routes.
// Get request
router.get('/vote', function (req, res, next) {
  res.render('vote');
});

// Post request
router.post('/vote', function (req, res) {
  if (typeof req.body.person !== undefined) {
    makeVote(req.body.votingRoom, req.body.person.toLowerCase(), function (canVote) {
      if (canVote === true) {
        res.redirect('/success');
      }
    });
  } else {
    console.log('Voting room or person voted not correct type');
    res.redirect('/vote');
  }
});

module.exports = router;
