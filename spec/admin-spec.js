var expect = require('chai').expect;
var request = require('request');
var app = require('../src/server/server.js');

describe('server', function() {

  var server;

  before(function() {
    server = app.listen(4570, function() {
      console.log('ngage is listening on 4570');
    });
  });

  after(function() {
    server.close();
  });

  it('should respond to GET requests for / with a 200 status code', function(done) {
    request('http://127.0.0.1:4570', function(error, response, body) {
      expect(response.statusCode).to.equal(200);
      done();
    });
  });

  it('should not respond with "Cannot GET" at any unrecognized route', function(done) {
    request('http://127.0.0.1:4570/OneLayerRoute', function(error, response, body) {
      // console.log(response.body.slice(0, 10));
      expect(response.body.slice(0, 10)).to.not.equal('Cannot GET');
      done();
    });
  });

  it('should not respond with "Cannot GET" at any unrecognized route, nested routes', function(done) {
    request('http://127.0.0.1:4570/OneLayerRoute/two/three/four', function(error, response, body) {
      // console.log(response.body.slice(0, 10));
      expect(response.body.slice(0, 10)).to.not.equal('Cannot GET');
      done();
    });
  });

  it('should respond to GET requests for /create with a 200 status code', function(done) {
    request('http://127.0.0.1:4570/create', function(error, response, body) {
      expect(response.statusCode).to.equal(200);
      done();
    });
  });
});

// ----------Front-End Tests------------- //

import Inferno from 'inferno';
import { isClassVNode } from 'inferno-test-utils';
var CreatePresentation = require('../src/shared/components/CreatePresentation.jsx');

describe('CreatePresentation', function() {

  var create;

  beforeEach(function() {
    // console.log(isClassVNode(<CreatePresentation />));
  });
});
