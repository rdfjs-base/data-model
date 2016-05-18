'use strict'

/* global describe, it */

const assert = require('assert')
const BlankNode = require('../lib/blank-node')
const DataFactory = require('../lib/data-factory')
const DefaultGraph = require('../lib/default-graph')
const Literal = require('../lib/literal')
const NamedNode = require('../lib/named-node')
const Quad = require('../lib/quad')
const Variable = require('../lib/variable')

describe('DataFactory', () => {
  it('should contain a static method .namedNode', () => {
    assert.equal(typeof DataFactory.namedNode, 'function')
  })

  it('.namedNode should create a NamedNode with the given IRI', () => {
    let iri = 'http://example.org'
    let term1 = DataFactory.namedNode(iri)
    let term2 = new NamedNode(iri)

    assert.equal(term1.equals(term2), true)
  })

  it('should contain a static method .blankNode', () => {
    assert.equal(typeof DataFactory.blankNode, 'function')
  })

  it('.blankNode should create a BlankNode', () => {
    let term = DataFactory.blankNode()

    assert.equal(term.termType, 'BlankNode')
  })

  it('.blankNode should create a BlankNode with the given id', () => {
    let id = 'z0'
    let term1 = DataFactory.blankNode(id)
    let term2 = new BlankNode(id)

    assert.equal(term1.equals(term2), true)
  })

  it('should contain a static method .literal', () => {
    assert.equal(typeof DataFactory.literal, 'function')
  })

  it('.literal should create a Literal with the given value', () => {
    let value = 'example'
    let term1 = DataFactory.literal(value)
    let term2 = new Literal(value)

    assert.equal(term1.equals(term2), true)
  })

  it('.literal should detect the second parameter as language string', () => {
    let value = 'example'
    let language = 'en'
    let term1 = DataFactory.literal(value, language)
    let term2 = new Literal(value, language)

    assert.equal(term1.equals(term2), true)
  })

  it('.literal should detect the second parameter as datatype string', () => {
    let value = 'example'
    let datatype = 'http://example.org'
    let term1 = DataFactory.literal(value, datatype)
    let term2 = new Literal(value, null, new NamedNode(datatype))

    assert.equal(term1.equals(term2), true)
  })

  it('.literal should detect the second parameter as datatype object', () => {
    let value = 'example'
    let datatype = new NamedNode('http://example.org')
    let term1 = DataFactory.literal(value, datatype)
    let term2 = new Literal(value, null, datatype)

    assert.equal(term1.equals(term2), true)
  })

  it('should contain a static method .variable', () => {
    assert.equal(typeof DataFactory.variable, 'function')
  })

  it('.variable should create a Variable with the given name', () => {
    let name = 'example'
    let term1 = DataFactory.variable(name)
    let term2 = new Variable(name)

    assert.equal(term1.equals(term2), true)
  })

  it('should contain a static method .defaultGraph', () => {
    assert.equal(typeof DataFactory.defaultGraph, 'function')
  })

  it('.defaultGraph should create a DefaultGraph', () => {
    let term1 = DataFactory.defaultGraph()
    let term2 = new DefaultGraph()

    assert.equal(term1.equals(term2), true)
  })

  it('should contain a static method .triple', () => {
    assert.equal(typeof DataFactory.triple, 'function')
  })

  it('.triple should create a Quad from the given arguments with graph set to DefaultGraph', () => {
    let subject = new NamedNode('http://example.org/subject')
    let predicate = new NamedNode('http://example.org/predicate')
    let object = new NamedNode('http://example.org/object')
    let quad1 = DataFactory.triple(subject, predicate, object)
    let quad2 = new Quad(subject, predicate, object)

    assert.equal(quad1.equals(quad2), true)
  })

  it('should contain a static method .quad', () => {
    assert.equal(typeof DataFactory.quad, 'function')
  })

  it('.quad should create a Quad from the given arguments', () => {
    let subject = new NamedNode('http://example.org/subject')
    let predicate = new NamedNode('http://example.org/predicate')
    let object = new NamedNode('http://example.org/object')
    let graph = new NamedNode('http://example.org/graph')
    let quad1 = DataFactory.quad(subject, predicate, object, graph)
    let quad2 = new Quad(subject, predicate, object, graph)

    assert.equal(quad1.equals(quad2), true)
  })
})
