var yelp = require('yelp');
var db = require('./databaseUtils');
var promise = require('bluebird');
var _ = require('underscore');

var yelpClient = yelp.createClient({
  consumer_key: "FhjjO2XJID4KVwUxclltgQ",
  consumer_secret: "ug9z35Pu8iDZx8RIbJFHW2ej-TI",
  token: "5aH0EH6Z8kuuQE3xqUtxJTmqCtu5DvrU",
  token_secret: "vPrtiIvZBmRkPVWJ-mtDAx9uqB0"
});

// See http://www.yelp.com/developers/documentation/v2/search_api
//yelpClient.search({term: "food", location: "San Francisco"}, function(error, data) {
//  console.log('yelp search error:', error);
//  console.log('yelp search data:', data);
//});

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

var dummyResults = [
  {
    restaurantName: 'The House',
    url: 'www.a.com',
    location: 'san francisco',
    image_url: '<img alt="The House" class="photo-box-img" height="90" src="//s3-media3.fl.yelpcdn.com/bphoto/zRQX2YrSaLA3WLocvl8x8A/90s.jpg" width="90">',
    desc: 'The food is amazing with the wasabi noodles topping the chart. &nbsp;• &nbsp;As for appetizers, you have to try the deep fried salmon rolls! The grilled sea bass with garlic ginger soy is also',
    address: '1230 Grant Ave, San Francisco, CA 94133',
    phone: '(415) 986-8612'
  },
  {
    restaurantName: 'Olive Garden',
    url: 'www.olivegarden.com',
    location: 'san francisco',
    image_url: '<img alt="The House" class="photo-box-img" height="90" src="//s3-media3.fl.yelpcdn.com/bphoto/zRQX2YrSaLA3WLocvl8x8A/90s.jpg" width="90">',
    desc: 'The food is amazing with the wasabi noodles topping the chart. &nbsp;• &nbsp;As for appetizers, you have to try the deep fried salmon rolls! The grilled sea bass with garlic ginger soy is also',
    address: '1230 Grant Ave, San Francisco, CA 94133',
    phone: '(415) 986-8612'
  }
];

yelpClient.findLunch = function(userList) {
  var categories = {};
  var index = userList.data.length;
  var results = null;

  console.log("finding lunch...", userList.data);

  return new promise(function(resolve, reject) {
    console.log("promising...");
    for (var i = 0; i < userList.data.length; i++) {
      // get user prefs
      db.getUserPrefs(userList.data[i])
      .then(function(prefs) {
        console.log('prefs:', prefs);
        
        if(prefs.length){
          var foodCategories = JSON.parse(prefs[0].categories);
          console.log("food: ", foodCategories, " index: ", index);
          for (var key in foodCategories) {
            if (foodCategories[key]) {
              if (categories[key]) {
                categories[key]++;
              } else {
                categories[key] = 1;
              }
            }
          }
        }
        index--;
      }, function(err) {
        console.log("rejecting promise: ", err);
      });
    }

    var waitForResults = function() {
      if (index > 0) {
        console.log("index ", index);
        setTimeout(waitForResults, 10)
      } else {

        console.log("cats: ", categories);

        // DO THE YELP SEARCH
        var yelps = {};
        var finished = false;
        var count = Object.keys(categories).length;

        for (var key in categories) {
          console.log('key:', key);
          yelpClient.search({term: key, location: 'San Francisco', limit: 10}, function (error, results) {
            if(error) {
              console.log('search error:', error);
            }
            //console.log('yelp search results:', results.businesses);
            if (results.businesses.length) {
              for(var i = 0; i < results.businesses.length; i++) {
                if(yelps[results.businesses[i].id]) {
                  yelps[results.businesses[i].id].sort += 1;
                } else {
                  var obj = {
                    restaurantName: results.businesses[i].name,
                    url: results.businesses[i].url,
                    location: results.businesses[i].location.city,
                    image_url: results.businesses[i].image_url,
                    desc: results.businesses[i].snippet_text,
                    phone: results.businesses[i].phone,
                    rating_url: results.businesses[i].rating_img_url,
                    review_count: results.businesses[i].review_count,
                    sort: 1 * categories[key]
                  };

                  yelps[results.businesses[i].id] = obj;
                }
              }
            }
            count--;
          })
        }

        var waitForYelps = function() {
          if (count > 0) {
            console.log("count ", count);
            setTimeout(waitForYelps, 10)
          } else {
            console.log("yelps:", yelps);
            resolve(yelps);
          }
        };

        waitForYelps();
      }
    };

    waitForResults();
  });
};

// var results = [];

// yelp.search(searchOptions, function(error, data) {
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


module.exports = yelpClient;