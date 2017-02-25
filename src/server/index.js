require('babel-register');
require('babel-polyfill');
var app = require('./server');
app.listen(3001, () => {
  console.log('Listening on port 3001');
});