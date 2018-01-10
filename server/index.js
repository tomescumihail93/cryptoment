var express = require('express');
var app = express();
var path = require('path');

app.use('/',express.static(__dirname+'/../client/dist'));

app.get('/*', function (req, res) {
res.sendFile(path.join(__dirname+'/../client/dist','index.html'))
});

app.use(function(req, res, next) {
var err = new Error('Not Found');
err.status = 404;
next(err);
});

app.listen(3000, function () {
console.log('Example listening on port 3000!');
});

module.exports = app;