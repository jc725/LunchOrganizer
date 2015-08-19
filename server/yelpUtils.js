yelp = require('yelp');


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

module.exports = yelpClient;