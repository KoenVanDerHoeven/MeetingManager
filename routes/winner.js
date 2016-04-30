var express = require('express');
var router = express.Router();
var db = require('../db/voting');

var findWinner = function (votingRoom, callback) {
  db.getVotesByRoom(votingRoom, function (error, rooms) {
    if (error) {
      callback(false);
    }
    if (rooms.length === 0) {
      console.log('The room is empty');
      callback('empty');
    } else {
      var currentHighest = rooms[0].vote;
      var currentWinner = rooms[0].person;
      for (var i = 1; i < rooms.length; i++) {
        if (rooms[i].vote === currentHighest) {
          console.log('There is a tie please revote');
          currentWinner = 'Tie';
          break;
        } else if (rooms[i].vote > currentHighest) {
          currentHighest = rooms[i].vote;
          currentWinner = rooms[i].person;
        }
      }
      console.log('Winner has been found');
      callback(currentWinner);
    }
  });
};

// Implement the routes.
// Get request
router.get('/winner', function (req, res, next) {
  res.render('winner');
});

// Post request
router.post('/winner', function (req, res) {
  findWinner(req.body.votingRoom, function (winner) {
    if (winner === 'empty') {
      console.log('There are no candidates in this room');
    } if (winner === 'Tie') {
      console.log('There is a tie please revote');
    } else {
      // Load the twilio module
      var twilio = require('twilio');

      // Create a new REST API client to make authenticated requests against the
      // twilio back end
      var client = new twilio.RestClient('ACb7a0541ca84141cbdf384dee3a247788', 'd79f350b61b8dcb42621d39868ae09eb');

      // Pass in parameters to the REST API using an object literal notation. The
      // REST client will handle authentication and response serialzation for you.
      client.sms.messages.create({
        to:'+1' + req.body.number,
        from:'+18562882748',
        body:'The winner of room ' + req.body.votingRoom + ' is ' + winner
      }, function (error, message) {
        // The HTTP request to Twilio will run asynchronously. This callback
        // function will be called when a response is received from Twilio
        // The "error" variable will contain error information, if any.
        // If the request was successful, this value will be "falsy"
        if (!error) {
          console.log('Success! The SID for this SMS message is:');
          console.log(message.sid);

          console.log('Message sent on:');
          console.log(message.dateCreated);
        } else {
          console.log('Oops! There was an error.');
        }
      });
      console.log(winner);
      res.redirect('/success');
    }
  });
});

module.exports = router;
