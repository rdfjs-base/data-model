'use strict'

/* global describe, it */

var assert = require('assert')
var DefaultGraph = require('../lib/default-graph')
var NamedNode = require('../lib/named-node')
var Quad = require('../lib/quad')

describe('Quad', function () {
  it('should be a constructor', function () {
    assert.equal(typeof Quad, 'function')
  })

  it('should create an object with .subject, .predicate, .object and .graph set to the values from the given constructor arguments', function () {
    var subject = new NamedNode('http://example.org/subject')
    var predicate = new NamedNode('http://example.org/predicate')
    var object = new NamedNode('http://example.org/object')
    var graph = new NamedNode('http://example.org/graph')
    var quad = new Quad(subject, predicate, object, graph)

    assert.equal(subject.equals(quad.subject), true)
    assert.equal(predicate.equals(quad.predicate), true)
    assert.equal(object.equals(quad.object), true)
    assert.equal(graph.equals(quad.graph), true)
  })

  it('should create an object .graph set to DefaultGraph if the argument isn\'t given', function () {
    var subject = new NamedNode('http://example.org/subject')
    var predicate = new NamedNode('http://example.org/predicate')
    var object = new NamedNode('http://example.org/object')
    var quad = new Quad(subject, predicate, object)

    assert.equal(quad.graph.equals(new DefaultGraph()), true)
  })

  it('.equals should return true if the other quad contains the same subject, predicate, object and graph', function () {
    var subject = new NamedNode('http://example.org/subject')
    var predicate = new NamedNode('http://example.org/predicate')
    var object = new NamedNode('http://example.org/object')
    var graph = new NamedNode('http://example.org/graph')
    var quad1 = new Quad(subject, predicate, object, graph)
    var quad2 = new Quad(subject, predicate, object, graph)

    assert.equal(quad1.equals(quad2), true)
  })

  it('.equals should return false if the subject of the other quads is not the same', function () {
    var subject1 = new NamedNode('http://example.org/subject')
    var subject2 = new NamedNode('http://example.com/subject')
    var predicate = new NamedNode('http://example.org/predicate')
    var object = new NamedNode('http://example.org/object')
    var graph = new NamedNode('http://example.org/graph')
    var quad1 = new Quad(subject1, predicate, object, graph)
    var quad2 = new Quad(subject2, predicate, object, graph)

    assert.equal(quad1.equals(quad2), false)
  })

  it('.equals should return false if the predicate of the other quads is not the same', function () {
    var subject = new NamedNode('http://example.org/subject')
    var predicate1 = new NamedNode('http://example.org/predicate')
    var predicate2 = new NamedNode('http://example.com/predicate')
    var object = new NamedNode('http://example.org/object')
    var graph = new NamedNode('http://example.org/graph')
    var quad1 = new Quad(subject, predicate1, object, graph)
    var quad2 = new Quad(subject, predicate2, object, graph)

    assert.equal(quad1.equals(quad2), false)
  })

  it('.equals should return false if the object of the other quads is not the same', function () {
    var subject = new NamedNode('http://example.org/subject')
    var predicate = new NamedNode('http://example.org/predicate')
    var object1 = new NamedNode('http://example.org/object')
    var object2 = new NamedNode('http://example.com/object')
    var graph = new NamedNode('http://example.org/graph')
    var quad1 = new Quad(subject, predicate, object1, graph)
    var quad2 = new Quad(subject, predicate, object2, graph)

    assert.equal(quad1.equals(quad2), false)
  })

  it('.equals should return false if the graph of the other quads is not the same', function () {
    var subject = new NamedNode('http://example.org/subject')
    var predicate = new NamedNode('http://example.org/predicate')
    var object = new NamedNode('http://example.org/object')
    var graph1 = new NamedNode('http://example.org/graph')
    var graph2 = new NamedNode('http://example.com/graph')
    var quad1 = new Quad(subject, predicate, object, graph1)
    var quad2 = new Quad(subject, predicate, object, graph2)

    assert.equal(quad1.equals(quad2), false)
  })

  it('.toCanonical should return a canonical representation', function () {
    var subject = new NamedNode('http://example.org/subject')
    var predicate = new NamedNode('http://example.org/predicate')
    var object = new NamedNode('http://example.org/object')
    var graph = new NamedNode('http://example.org/graph')
    var quad = new Quad(subject, predicate, object, graph)

    assert.equal(quad.toCanonical(), '<http://example.org/subject> <http://example.org/predicate> <http://example.org/object> <http://example.org/graph>')
  })

  it('.toCanonical should skip the graph if it\'s a DefaultGraph', function () {
    var subject = new NamedNode('http://example.org/subject')
    var predicate = new NamedNode('http://example.org/predicate')
    var object = new NamedNode('http://example.org/object')
    var quad = new Quad(subject, predicate, object)

    assert.equal(quad.toCanonical(), '<http://example.org/subject> <http://example.org/predicate> <http://example.org/object>')
  })
})

