'use strict'

/* global describe, it */

const assert = require('assert')
const DefaultGraph = require('../lib/default-graph')
const NamedNode = require('../lib/named-node')
const Quad = require('../lib/quad')

describe('Quad', () => {
  it('should be a constructor', () => {
    assert.equal(typeof Quad, 'function')
  })

  it('should create an object with .subject, .predicate, .object and .graph set to the values from the given constructor arguments', () => {
    let subject = new NamedNode('http://example.org/subject')
    let predicate = new NamedNode('http://example.org/predicate')
    let object = new NamedNode('http://example.org/object')
    let graph = new NamedNode('http://example.org/graph')
    let quad = new Quad(subject, predicate, object, graph)

    assert.equal(subject.equals(quad.subject), true)
    assert.equal(predicate.equals(quad.predicate), true)
    assert.equal(object.equals(quad.object), true)
    assert.equal(graph.equals(quad.graph), true)
  })

  it('should create an object .graph set to DefaultGraph if the argument isn\'t given', () => {
    let subject = new NamedNode('http://example.org/subject')
    let predicate = new NamedNode('http://example.org/predicate')
    let object = new NamedNode('http://example.org/object')
    let quad = new Quad(subject, predicate, object)

    assert.equal(quad.graph.equals(new DefaultGraph()), true)
  })

  it('.equals should return true if the other quad contains the same subject, predicate, object and graph', () => {
    let subject = new NamedNode('http://example.org/subject')
    let predicate = new NamedNode('http://example.org/predicate')
    let object = new NamedNode('http://example.org/object')
    let graph = new NamedNode('http://example.org/graph')
    let quad1 = new Quad(subject, predicate, object, graph)
    let quad2 = new Quad(subject, predicate, object, graph)

    assert.equal(quad1.equals(quad2), true)
  })

  it('.equals should return false if the subject of the other quads is not the same', () => {
    let subject1 = new NamedNode('http://example.org/subject')
    let subject2 = new NamedNode('http://example.com/subject')
    let predicate = new NamedNode('http://example.org/predicate')
    let object = new NamedNode('http://example.org/object')
    let graph = new NamedNode('http://example.org/graph')
    let quad1 = new Quad(subject1, predicate, object, graph)
    let quad2 = new Quad(subject2, predicate, object, graph)

    assert.equal(quad1.equals(quad2), false)
  })

  it('.equals should return false if the predicate of the other quads is not the same', () => {
    let subject = new NamedNode('http://example.org/subject')
    let predicate1 = new NamedNode('http://example.org/predicate')
    let predicate2 = new NamedNode('http://example.com/predicate')
    let object = new NamedNode('http://example.org/object')
    let graph = new NamedNode('http://example.org/graph')
    let quad1 = new Quad(subject, predicate1, object, graph)
    let quad2 = new Quad(subject, predicate2, object, graph)

    assert.equal(quad1.equals(quad2), false)
  })

  it('.equals should return false if the object of the other quads is not the same', () => {
    let subject = new NamedNode('http://example.org/subject')
    let predicate = new NamedNode('http://example.org/predicate')
    let object1 = new NamedNode('http://example.org/object')
    let object2 = new NamedNode('http://example.com/object')
    let graph = new NamedNode('http://example.org/graph')
    let quad1 = new Quad(subject, predicate, object1, graph)
    let quad2 = new Quad(subject, predicate, object2, graph)

    assert.equal(quad1.equals(quad2), false)
  })

  it('.equals should return false if the graph of the other quads is not the same', () => {
    let subject = new NamedNode('http://example.org/subject')
    let predicate = new NamedNode('http://example.org/predicate')
    let object = new NamedNode('http://example.org/object')
    let graph1 = new NamedNode('http://example.org/graph')
    let graph2 = new NamedNode('http://example.com/graph')
    let quad1 = new Quad(subject, predicate, object, graph1)
    let quad2 = new Quad(subject, predicate, object, graph2)

    assert.equal(quad1.equals(quad2), false)
  })

  it('.toCanonical should return a canonical representation', () => {
    let subject = new NamedNode('http://example.org/subject')
    let predicate = new NamedNode('http://example.org/predicate')
    let object = new NamedNode('http://example.org/object')
    let graph = new NamedNode('http://example.org/graph')
    let quad = new Quad(subject, predicate, object, graph)

    assert.equal(quad.toCanonical(), '<http://example.org/subject> <http://example.org/predicate> <http://example.org/object> <http://example.org/graph>')
  })

  it('.toCanonical should skip the graph if it\'s a DefaultGraph', () => {
    let subject = new NamedNode('http://example.org/subject')
    let predicate = new NamedNode('http://example.org/predicate')
    let object = new NamedNode('http://example.org/object')
    let quad = new Quad(subject, predicate, object)

    assert.equal(quad.toCanonical(), '<http://example.org/subject> <http://example.org/predicate> <http://example.org/object>')
  })
})

