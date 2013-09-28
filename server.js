var express = require('express');
var app = express();

// save posted geodata
app.post('/', function(req, res){
  res.send('http://host/the-id');
});

app.get('/', function(req,res){
	res.send("hello")
})

var port = process.env.PORT || 3000;
app.listen(port);

console.log('Listening on port ' + port);