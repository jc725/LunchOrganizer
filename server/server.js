var express = require('express'),
    bodyParser = require('body-parser'),
    request = require('request'),
    http = require('http'),
    path = require('path'),
    yelper = require('./yelpUtils'),
    db = require('./databaseUtils');

var app = express();

var port = process.env.PORT || 8000;
app.listen(port);
console.log('Server is listening on port ' + port);

// middleware
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/../client'));

app.get('/', function(req, res) {
  res.render('index');
});

app.post('/login', function(req, res) {
  // authenicate the user
  res.send('OK');
});

app.post('/signup', function(req, res) {
  // store user info in the db
  res.send('OK');
});

app.post('/setprofile', function(req, res) {
  // store user profile in the db
  res.send('OK');
});

app.post('/organizeLunch', function(req, res) {
  // store user profile in the db
  res.send('OK');
});

app.get('/users', function(req, res) {
  var users = { data: [ 'reva', 'sylvie', 'justin', 'will', 'dennis' ] };
  res.send(users);
});

app.get('/search', function(req, res) {

  yelper.search({term: "food", location: "San Francisco"}, function(error, data) {
    // console.log('yelp search error:', error);
    // console.log('yelp search data:', data);
  });

});
