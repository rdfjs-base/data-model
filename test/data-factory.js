'use strict'

/* global describe, it */

var assert = require('assert')
var BlankNode = require('../lib/blank-node')
var DataFactory = require('../lib/data-factory')
var DefaultGraph = require('../lib/default-graph')
var Literal = require('../lib/literal')
var NamedNode = require('../lib/named-node')
var Quad = require('../lib/quad')
var Variable = require('../lib/variable')

describe('DataFactory', function () {
  it('should contain a static method .namedNode', function () {
    assert.equal(typeof DataFactory.namedNode, 'function')
  })

  it('.namedNode should create a NamedNode with the given IRI', function () {
    var iri = 'http://example.org'
    var term1 = DataFactory.namedNode(iri)
    var term2 = new NamedNode(iri)

    assert.equal(term1.equals(term2), true)
  })

  it('should contain a static method .blankNode', function () {
    assert.equal(typeof DataFactory.blankNode, 'function')
  })

  it('.blankNode should create a BlankNode', function () {
    var term = DataFactory.blankNode()

    assert.equal(term.termType, 'BlankNode')
  })

  it('.blankNode should create a BlankNode with the given id', function () {
    var id = 'z0'
    var term1 = DataFactory.blankNode(id)
    var term2 = new BlankNode(id)

    assert.equal(term1.equals(term2), true)
  })

  it('should contain a static method .literal', function () {
    assert.equal(typeof DataFactory.literal, 'function')
  })

  it('.literal should create a Literal with the given value', function () {
    var value = 'example'
    var term1 = DataFactory.literal(value)
    var term2 = new Literal(value)

    assert.equal(term1.equals(term2), true)
  })

  it('.literal should detect the second parameter as language string', function () {
    var value = 'example'
    var language = 'en'
    var term1 = DataFactory.literal(value, language)
    var term2 = new Literal(value, language)

    assert.equal(term1.equals(term2), true)
  })

  it('.literal should detect the second parameter as datatype string', function () {
    var value = 'example'
    var datatype = 'http://example.org'
    var term1 = DataFactory.literal(value, datatype)
    var term2 = new Literal(value, null, new NamedNode(datatype))

    assert.equal(term1.equals(term2), true)
  })

  it('.literal should detect the second parameter as datatype object', function () {
    var value = 'example'
    var datatype = new NamedNode('http://example.org')
    var term1 = DataFactory.literal(value, datatype)
    var term2 = new Literal(value, null, datatype)

    assert.equal(term1.equals(term2), true)
  })

  it('should contain a static method .variable', function () {
    assert.equal(typeof DataFactory.variable, 'function')
  })

  it('.variable should create a Variable with the given name', function () {
    var name = 'example'
    var term1 = DataFactory.variable(name)
    var term2 = new Variable(name)

    assert.equal(term1.equals(term2), true)
  })

  it('should contain a static method .defaultGraph', function () {
    assert.equal(typeof DataFactory.defaultGraph, 'function')
  })

  it('.defaultGraph should create a DefaultGraph', function () {
    var term1 = DataFactory.defaultGraph()
    var term2 = new DefaultGraph()

    assert.equal(term1.equals(term2), true)
  })

  it('should contain a static method .triple', function () {
    assert.equal(typeof DataFactory.triple, 'function')
  })

  it('.triple should create a Quad from the given arguments with graph set to DefaultGraph', function () {
    var subject = new NamedNode('http://example.org/subject')
    var predicate = new NamedNode('http://example.org/predicate')
    var object = new NamedNode('http://example.org/object')
    var quad1 = DataFactory.triple(subject, predicate, object)
    var quad2 = new Quad(subject, predicate, object)

    assert.equal(quad1.equals(quad2), true)
  })

  it('should contain a static method .quad', function () {
    assert.equal(typeof DataFactory.quad, 'function')
  })

  it('.quad should create a Quad from the given arguments', function () {
    var subject = new NamedNode('http://example.org/subject')
    var predicate = new NamedNode('http://example.org/predicate')
    var object = new NamedNode('http://example.org/object')
    var graph = new NamedNode('http://example.org/graph')
    var quad1 = DataFactory.quad(subject, predicate, object, graph)
    var quad2 = new Quad(subject, predicate, object, graph)

    assert.equal(quad1.equals(quad2), true)
  })
})
