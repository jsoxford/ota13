var express = require('express');
var knox = require('knox');
var app = express();

app.use(express.bodyParser());

var client = knox.createClient({
  key:    process.env.AWS_KEY,
  secret: process.env.AWS_SECRET,
  bucket: process.env.AWS_BUCKET,
  region: 'eu-west-1'
});

// cors
app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});


// save posted geodata
app.post('/', function(req, res){
	var fname = basename();

	var string = req.body.content;

	var s3req = client.put('/' + fname + '.txt', {
    'Content-Length': string.length,
	  'Content-Type': 'plain/text',
	  'x-amz-acl': 'public-read'
	});
	s3req.on('response', function(s3res){
	  if (200 == s3res.statusCode) {
	    console.log('saved to %s', s3req.url);

	    res.send('http://' + req.get('host') + '/' + fname + '.html');

	  } else {
	  	console.log(s3res.statusCode)
	  	console.log("problem", s3res)

	  	res.send('fail');
	  }
	});
	s3req.end(string);

});


app.get('/:id.html', function(req,res){
  res.send("not yet implemented - though your picture has totally been saved (we promise)")
})

app.use(express.static(__dirname + '/local'));


var port = process.env.PORT || 3000;
app.listen(port);

console.log('Listening on port ' + port);


// hacky filename generator
// only one upload a second allowed
function basename(){
	var d = new Date;
	return [d.getFullYear(), d.getMonth(), d.getDate(), d.getHours(), d.getMinutes(), d.getSeconds(), d.getMilliseconds()].join('-')
}
