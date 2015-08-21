var pg = require('postgres-bluebird');
var connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/lunch';

module.exports = {
  addUser: function(email, username, password) {
    return pg.connectAsync(connectionString).spread(function(connection, release) {
        return connection.queryAsync("SELECT * FROM users WHERE username = $1", [username])
          .then(function(result) {
            if (result.rows.length) {
              throw new Error('user already exists');
            } else {
              return connection.queryAsync("INSERT INTO users(email, username, password) values ($1, $2, $3)", [email, username, password])
            }
          }, function(err) {
            console.log('rejected with error:', err);
          })
        .finally(function() {
          release();
        });
    });
  },

  addUserPrefs: function(username, prefs) {
    return pg.connectAsync(connectionString).spread(function(connection, release) {
      return connection.queryAsync("SELECT * FROM userprefs WHERE username = $1", [username])
        .then(function(result) {
          if(result.rows.length) {
            return connection.queryAsync("UPDATE userprefs SET categories = $1 WHERE username = $2", [prefs, username])
          }
          else {
            return connection.queryAsync("INSERT INTO userprefs(username, categories) values ($1, $2)", [username, prefs]);
          }
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
          release();
          return result.rows;
        }, function(err) {
          console.log('rejected with error:', err);
        });
    });
  },
  getAllUsers: function() {
    return pg.connectAsync(connectionString).spread(function(connection, release) {
      return connection.queryAsync("SELECT * FROM users")
        .then(function(result) {
          release();
          return result.rows;
        }, function(err) {
          console.log('rejected with error:', err);
        });
    });
  },
  getUser: function(username) {
    return pg.connectAsync(connectionString).spread(function(connection, release) {
      return connection.queryAsync("SELECT * FROM users WHERE username = $1", [username])
        .then(function(result) {
          release();
          return result.rows;
        }, function(err) {
          console.log('rejected with error:', err);
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
// CREATE TABLE userPrefs(id SERIAL PRIMARY KEY not null, username varchar(300) NOT NULL, categories varchar(300));
// delete table: > drop table {tablename}


// ---- DO NOT EVER DO THIS ---- //
// Refresh Heroku database:
// heroku pg:reset DATABASE --confirm hackathon-lunch-organizer
// heroku pg:push postgres://localhost:5432/lunch DATABASE --app hackathon-lunch-organizer
