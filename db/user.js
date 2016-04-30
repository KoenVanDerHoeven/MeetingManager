var mongo = require ('./mongo');

module.exports = {

  createAccount: function (username, password, callback) {
    var newUser = new mongo.User({username: username, password: password});
    newUser.save(function (error) {
      callback(error, newUser);
    });
  },

  getAllUsers: function (callback) {
    console.log("Getting All Users");
    mongo.User.find(function (error, users) {
      callback(error, users);
    });
  },

  getByUsername: function (username, callback) {
    mongo.User.find({username: username}).exec(function (error, user) {
      callback(error, user);
    });
  }
};
