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

  it('should respond to GET requests for /view with a 200 status code', function(done) {
    request('http://127.0.0.1:4570/view', function(error, response, body) {
      expect(response.statusCode).to.equal(200);
      done();
    });
  });
});

// ----------Front-End Tests------------- //

import Inferno from 'inferno';
import { renderToString } from 'inferno-server';
import { isFunctionalVNode, scryVNodesWithType } from 'inferno-test-utils';
var AddAnswer = require('../src/shared/components/CreatePresentation/AddAnswer.jsx');
var AddQuestion = require('../src/shared/components/CreatePresentation/AddQuestion.jsx');
var CreatePresentation = require('../src/shared/components/CreatePresentation/CreatePresentation.jsx');
var ViewQuestion = require('../src/shared/components/CreatePresentation/ViewQuestion.jsx');
var ViewPresentations = require('../src/shared/components/ViewPresentations/ViewPresentations.jsx');
var ViewPpt = require('../src/shared/components/ViewPresentations/ViewPpt.jsx');

describe('AddAnswer', function() {
    it('should be a functional-type VNode', () => {
    const node = <AddAnswer presentationID="4" addToViewQuestions={() => {}} type="4" length="4" />;
    expect(isFunctionalVNode(node, 'div')).to.equal(true);
  });
});

describe('AddQuestion', function() {
    it('should be a functional-type VNode', () => {
    const node = <AddQuestion presentationID="4" addToViewQuestions={() => {}} type="4" length="4" />;
    expect(isFunctionalVNode(node, 'div')).to.equal(true);
  });
});

describe('ViewQuestion', function() {
    it('should be a functional-type VNode', () => {
    const node = <ViewQuestion presentationID="4" addToViewQuestions={() => {}} type="4" length="4" />;
    expect(isFunctionalVNode(node, 'div')).to.equal(true);
  });
});

describe('CreatePresentation', function() {
  it('should be a functional-type VNode', () => {
    const node = <CreatePresentation/>;
    expect(isFunctionalVNode(node)).to.equal(true);
  });
});

describe('ViewPresentations', function() {
  it('should be a functional-type VNode', () => {
    const node = <ViewPresentations userID="2" />;
    expect(isFunctionalVNode(node)).to.equal(true);
  });
});

describe('ViewPpt', function() {
  it('should be a functional-type VNode', () => {
    const node = <ViewPpt presentationID="2" />;
    expect(isFunctionalVNode(node)).to.equal(true);
  });
});
