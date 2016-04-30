var mongo = require ('./mongo');

module.exports = {

  createAccount: function (votingRoom, person, vote, callback) {
    var newVote = new mongo.Voting({votingRoom: votingRoom, person: person, vote:vote});
    newVote.save(function (error) {
      callback(error, newVote);
    });
  },

  updateAccount: function (votingRoom, person, vote, callback) {
    // Delete entry
    mongo.Voting.find( {$and: [{votingRoom: votingRoom}, {person: person}]}).remove().exec();
    // Add new entry
    var newVote = new mongo.Voting({votingRoom: votingRoom, person: person, vote:vote});
    newVote.save(function (error) {
      callback(error, newVote);
    });
  },

  getAllVotes: function (callback) {
    mongo.Voting.find(function (error, votes) {
      callback(error, votes);
    });
  },

  getVotesByRoom: function (votingRoom, callback) {
    mongo.Voting.find({votingRoom: votingRoom}).exec(function (error, votes) {
      callback(error, votes);
    });
  },

  getVotesByUser: function (votingRoom, person, callback) {
    mongo.Voting.find( {$and: [{votingRoom: votingRoom}, {person: person}]}).exec(function (error, votes) {
      callback(error, votes);
    });
  }
};
