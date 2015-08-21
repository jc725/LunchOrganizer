var express = require('express'),
    bodyParser = require('body-parser'),
    request = require('request'),
    http = require('http'),
    path = require('path'),
    yelper = require('./yelpUtils'),
    db = require('./databaseUtils'),
    passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy;

var app = express();

var port = process.env.PORT || 8000;
app.listen(port);
console.log('Server is listening on port ' + port);

// middleware
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/../client'));

// AUTHENTICATION SETUP
passport.use(new LocalStrategy(
  function(username, password, done) {
    
    db.getUser(username).then(function(result) {
      if (result.length && result[0].password === password) {
        return done(null, true);
      } else {
        return done(null, false, {message: "Authentication failure."});
      }
    }, function(err) {
      return done(null, false, {message: "User not found."});
    });
  }
));


app.get('/', function(req, res) {
  res.render('index');
});

app.post('/login', passport.authenticate('local', {
    // TODO this doesn't quite work
    successRedirect: '/',
    failureRedirect: '/#/Login'
  })
);

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