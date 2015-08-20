var pg = require('pg');
var connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/lunch';

//var client = new pg.Client(connectionString);
//client.connect();

module.exports = {
  addUser: function(data, callback) {
    // Get a Postgres client from the connection pool
    pg.connect(connectionString, function(err, client, done) {

      // SQL Query > Insert Data
      var query = client.query("INSERT INTO users(email, username, password) values ($1, $2, $3)", [data.email, data.username, data.password]);

      query.on('end', function() {
        client.end();
      });

      callback(err);
    });
  },
  addUserPrefs: function(data, userid, callback) {
    // Get a Postgres client from the connection pool
    pg.connect(connectionString, function(err, client, done) {

      // SQL Query > Select Data
      var query = client.query("SELECT * FROM userPrefs WHERE userid = $1", [userid]);

      // Stream results back one row at a time
      query.on('row', function(row) {
        console.log('row:', row);
        console.log('categories:', obj.foodcategories);
      });


      //// SQL Query > Insert Data
      //var query = client.query("INSERT INTO users(email, username, password) values ($1, $2, $3)", [data.email, data.username, data.password]);

      query.on('end', function() {
        client.end();
      });

      callback(err);
    });
  },
  getUserPrefs: function(data, callback) {
    //// Get a Postgres client from the connection pool
    //pg.connect(connectionString, function(err, client, done) {
    //
    //  // SQL Query > Insert Data
    //  var query = client.query("INSERT INTO users(email, username, password) values ($1, $2, $3)", [data.email, data.username, data.password]);
    //
    //  query.on('end', function() {
    //    client.end();
    //  });
    //
    //  callback(err);
    //});
  }
};


//router.post('/api/v1/todos', function(req, res) {
//
//  var results = [];
//
//  // Grab data from http request
//  var data = {text: req.body.text, complete: false};
//
//  // Get a Postgres client from the connection pool
//  pg.connect(connectionString, function(err, client, done) {
//
//    // SQL Query > Insert Data
//    client.query("INSERT INTO items(text, complete) values($1, $2)", [data.text, data.complete]);
//
//    // SQL Query > Select Data
//    var query = client.query("SELECT * FROM items ORDER BY id ASC");
//
//    // Stream results back one row at a time
//    query.on('row', function(row) {
//      results.push(row);
//    });
//
//    // After all data is returned, close connection and return results
//    query.on('end', function() {
//      client.end();
//      return res.json(results);
//    });
//
//    // Handle Errors
//    if(err) {
//      console.log(err);
//    }
//
//  });
//});


// -----------------------------------//
// setting up postgres DB on Mac
// many of these steps taken from here:
// http://mherman.org/blog/2015/02/12/postgresql-and-nodejs/#project-setup
// and here:
// https://devcenter.heroku.com/articles/heroku-postgresql#local-setup
// -----------------------------------//

// ---- One-time setup ---- //
// * Install the postgres app for Mac: http://postgresapp.com/
// * add this line to your bash profile: export PATH=$PATH:/Applications/Postgres.app/Contents/Versions/9.4/bin

// ---- Usage ---- //
// * Before any db magic can be done you must have Postgres.app running, and be in the LunchOrganizer github project folder
// * To pull the Heroku database to your local THIS WILL ERASE ANY DATA YOU HAVE LOCALLY: > npm run setup-db
// * To connect to your local db: > npm run connect-db
// * To connect to the heroku database: > heroku pg:psql
// * To exit either database: > \q

// ---- Extras ---- //
// refresh Heroku database DO NOT EVER DO THIS
// heroku pg:reset DATABASE --confirm hackathon-lunch-organizer
// heroku pg:push postgres://localhost:5432/lunch DATABASE --app hackathon-lunch-organizer

//for reference:
//var queryUser = client.query('CREATE TABLE users(' +
//'id SERIAL PRIMARY KEY not null, ' +
//'email varchar(300), ' +
//'username varchar(300) NOT NULL, ' +
//'password varchar(300) NOT NULL)');
//queryUser.on('end', function() {
//  var queryUserInfo = client.query('CREATE TABLE userPrefs(' +
//  'id SERIAL PRIMARY KEY not null, ' +
//  'userID INTEGER not null, ' +
//  'foodCategories varchar(300), ' +
//  'dietaryRestrictions varchar(300) NOT NULL, ' +
//  'favoriteRestaurants INTEGER, ' +
//  'priceRange INTEGER)');
//  queryUserInfo.on('end', function() {
//    client.end();
//  });