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

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    done(null, user);
});

// AUTHENTICATION SETUP
passport.use('local', new LocalStrategy(function(username, password, done) {
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

app.post('/login', 
  passport.authenticate('local', {
    failureRedirect: '/login'
  }),
  function(req, res) {
    //res.redirect('/');
    res.send('Ok');
  }
);

app.post('/signup', function(req, res) {
  // store user info in the db
  db.addUser(req.body.data.email, req.body.data.userName, req.body.data.password)
    .then(function(response) {
      res.send('OK');
    }, function(err) {
      res.sendStatus(404);
    });
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
  db.getAllUsers()
    .then(function(response) {
      console.log('got users:', response);
      res.send(response);
    }, function(err) {
      res.sendStatus(404);
  });
});

app.get('/search', function(req, res) {

  yelper.search({term: "food", location: "San Francisco"}, function(error, data) {
    // console.log('yelp search error:', error);
    // console.log('yelp search data:', data);
  });

});