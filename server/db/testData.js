
function User(name, pw, email) {
  this.name = name;
  this.password = pw;
  this.email = email;
  
  this.locations = [];

  this.foodCategories = {};
  this.dietary = {};
  this.pricePref = 0;

};

User.prototype.addLocation = function(loc) {
  this.locations.push(loc);
};

var testUserList = [
  new User("Sylvie", "sylvieRules1", "sylvie28392@gmail.com"),
  new User("Reva", "revaRules1", "reva28392@gmail.com"),
  new User("Justin", "justinRules1", "justin28392@gmail.com"),
  new User("Amy", "amyRules1", "amy28392@gmail.com"),
  new User("Bill", "billRules1", "bill28392@gmail.com"),
];

testUserList[0].foodCategories = {"seafood": 1, "chinese": 1, "mexican": 1};
testUserList[0].dietary = {};
testUserList[0].pricePref = 2.5;

testUserList[1].foodCategories = {"salad": 1, "thai": 1, "mexican": 1};
testUserList[1].dietary = {};
testUserList[1].pricePref = 2;

testUserList[2].foodCategories = {"thai": 1, "seafood": 1, "greek": 1, "burgers": 1};
testUserList[2].dietary = {"gluten_free": 1};
testUserList[2].pricePref = 0; // result to be ignored

testUserList[3].foodCategories = {"japanese": 1, "seafood": 1, "burgers": 1, "polish": 1};
testUserList[3].dietary = {};
testUserList[3].pricePref = 1.5;

testUserList[4].foodCategories = {"mexican": 1, "greek": 1};
testUserList[4].dietary = {"vegetarian": 1};
testUserList[4].pricePref = 2;

module.exports = testUserList;




//userList = require('./db/testData')

// var geoLoc;
// function GetLocation(location){
//    lat = location.coords.latitude;
//    lng = location.coords.longitude;
//    geoLoc = lat + "," + lng;
// }
// navigator.geolocation.getCurrentPosition(GetLocation);
// console.log(geoLoc);

//console.log(userList);
// var searchOptions = {
//   term: "seafood",
//   ll: "37.7935566,-122.3941853",
//   radius_filter: 500
// };

// var results = [];

// yelper.search(searchOptions, function(error, data) {
//   //console.log('yelp search error:', error);
//   //console.log('yelp search data:', data);
//   results = data.businesses;
//   debugger;
//   for (var i = 0; i < results.length; i++) {
//     console.log("name: ", results[i].name);
//     console.log("id: ", results[i].id);
//     console.log(JSON.stringify(results[i].categories));
//     console.log("rating: ", results[i].rating);
//     console.log("review_count: ", results[i].review_count);
//     console.log("url: ", results[i].url);
//     console.log("rating_img_url: ", results[i].rating_img_url);

//     console.log("===================");
//   }
// });
