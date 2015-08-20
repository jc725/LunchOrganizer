var pg = require('postgres-bluebird');
var connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/lunch';

module.exports = {
  addUser: function(data) {
    return pg.connectAsync(connectionString).spread(function(connection, release) {
      return connection.queryAsync("INSERT INTO users(email, username, password) values ($1, $2, $3)", [data.email, data.username, data.password])
        .finally(function() {
          release();
        });
    });
  },

  addUserPrefs: function(data, userid) {
    return pg.connectAsync(connectionString).spread(function(connection, release) {
      return connection.queryAsync("SELECT * FROM userprefs WHERE userid = " + userid)
        .then(function(result) {
          console.log('userprefs query in add prefs:', result);
          console.log('userprefs query in add prefs rows:', result.rows);
          if(result.rows.length) {
            return connection.queryAsync("UPDATE userprefs SET categories = $1 WHERE userid = $2", [data, userid])
          }
           return connection.queryAsync("INSERT INTO userprefs(userid, categories) values ($1, $2)", [userid, data]);
        }, function(err) {
          console.log('rejected with error:', err);
        })
        .finally(function() {
          release();
          return null;
        });
    });
  },

  getUserPrefs: function(userid) {
    return pg.connectAsync(connectionString).spread(function(connection, release) {
      return connection.queryAsync("SELECT * FROM userprefs WHERE userid = $1", [userid])
        .then(function(result) {
          console.log('userprefs query in get prefs:', result);
          release();
          return result;
        });
    });
  },

  getAllUsers: function() {
    return pg.connectAsync(connectionString).spread(function(connection, release) {
      return connection.queryAsync("SELECT * FROM users")
        .then(function(result) {
          console.log('users query in get prefs:', result.rows);
          release();
          return result.rows;
        });
    });
  }
};

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
// If needed, here are the create table commands (run locally in psql in lunch database):
// CREATE TABLE users(id SERIAL PRIMARY KEY not null, email varchar(300) not null,  username varchar(300) NOT NULL, password varchar(300) NOT NULL);
// CREATE TABLE userPrefs(id SERIAL PRIMARY KEY not null, userid INTEGER not null, categories varchar(300));


// ---- DO NOT EVER DO THIS ---- //
// Refresh Heroku database:
// heroku pg:reset DATABASE --confirm hackathon-lunch-organizer
// heroku pg:push postgres://localhost:5432/lunch DATABASE --app hackathon-lunch-organizer
