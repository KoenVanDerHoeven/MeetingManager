var express = require('express');
var app = express();

var handleError = require('./middlewares/handleError');
var pageNotFound = require('./middlewares/pageNotFound');

var bodyParser = require('body-parser');

var login = require('./routes/login');
var newaccount = require('./routes/newaccount');
var success = require('./routes/success');
var vote = require('./routes/vote');
var winner = require('./routes/winner');

// Views setup
app.engine('html', require('ejs').__express);
app.set('view engine', 'html');
app.use(express.static(__dirname + '/public'));

// Render the index view
app.get('/', function (req, res) {
  res.render('index');
});

// Body Parser
app.use(bodyParser.urlencoded({
  extended: false
}));

// Router mounts
app.use('/', login);
app.use('/', newaccount);
app.use('/', success);
app.use('/', vote);
app.use('/', winner);

// Error
app.use(handleError);
app.use(pageNotFound);

module.exports = app;
