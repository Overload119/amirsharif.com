var express = require('express');

var app = express.createServer(express.logger());

app.get('/', function (req, res) {
	res.sendfile(__dirname + '/index.html');
});

app.get('/img/*', function (req, res) {
	var resource_path = __dirname + '/img/' + req.params[0];
	res.sendfile(resource_path);
});

app.get('/css/*', function (req, res) {
	var resource_path = __dirname + '/css/' + req.params[0];
	res.sendfile(resource_path);
});

app.get('/js/*', function (req, res) {
	var resource_path = __dirname + '/js/' + req.params[0];
	res.sendfile(resource_path);
});


app.get('/about', function (req, res) {
  res.sendfile(__dirname + '/about.html');
});

app.get('/resume', function (req, res) {
  res.sendfile(__dirname + '/resume.doc');
});

var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});