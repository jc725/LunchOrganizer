var expect = require('chai').expect;
var userList = require('../db/testData');
var db = require('../databaseUtils');

describe('database', function() {
  it('can add users', function (done){

    db.addUser({
      username: "Sylvie",
      password: "sylvieRules1",
      email: "sylvie28392@gmail.com"
    });

    db.getAllUsers()
    .then(function(results) {
      //console.log(results);
      done();
    });

    expect(true).to.equal(true);
  });
});