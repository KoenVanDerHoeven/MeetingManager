var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/cis197project', function (err) {
  if (err && err.message.includes('ECONNREFUSED')) {
    console.log('Error connecting to mongodb database: %s.\n', err.message);
    process.exit(0);
  } else if (err) {
    throw err;
  }
});

var db = mongoose.connection;

var userSchema = new mongoose.Schema({
  username: String,
  password: String
});

var votingSchema = new mongoose.Schema({
  votingRoom: Number,
  person: String,
  vote: Number
});

var User = mongoose.model('User', userSchema);
var Voting = mongoose.model('Voting', votingSchema);

module.exports = {
  User: User,
  Voting: Voting,
  mongoose: mongoose,
};
