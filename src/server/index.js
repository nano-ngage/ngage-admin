require('babel-register');
require('babel-polyfill');

var server = require('./server');
var PORT = 3000;

server.list(PORT, function(err) {
  console.log('Web server listening at port: ' PORT);
});
