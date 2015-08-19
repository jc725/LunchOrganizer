var express = require('express'),
    bodyParser = require('body-parser'),
    request = require('request');

var app = express();

var port = process.env.PORT || 8000;
app.listen(port);
console.log('Server is listening on port ' + port);

// middleware
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/../client'));

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/../client/index.html');
});

