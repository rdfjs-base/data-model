'use strict'

/* global describe, it */

var assert = require('assert')
var NamedNode = require('../lib/named-node')

describe('NamedNode', function () {
  it('should be a constructor', function () {
    assert.equal(typeof NamedNode, 'function')
  })

  it('should create an object with .termType set to "NamedNode"', function () {
    var iri = 'http://example.org'
    var term = new NamedNode(iri)

    assert.equal(term.termType, 'NamedNode')
  })

  it('should create an object with .value set to the value from the given constructor argument', function () {
    var iri = 'http://example.org'
    var term = new NamedNode(iri)

    assert.equal(term.value, iri)
  })

  it('.equals should return true if the other term is a NamedNode with the same IRI', function () {
    var iri = 'http://example.org'
    var term1 = new NamedNode(iri)
    var term2 = new NamedNode(iri)

    assert.equal(term1.equals(term2), true)
  })

  it('.equals should return false if the other term is not a NamedNode', function () {
    var iri = 'http://example.org'
    var term1 = new NamedNode(iri)
    var term2 = {termType: 'BlankNode', value: iri}

    assert.equal(term1.equals(term2), false)
  })

  it('.equals should return false if the other term is a NamedNode with a different IRI', function () {
    var iri1 = 'http://example.org'
    var iri2 = 'http://example.com'
    var term1 = new NamedNode(iri1)
    var term2 = new NamedNode(iri2)

    assert.equal(term1.equals(term2), false)
  })

  it('.toCanonical should return a canonical representation', function () {
    var iri = 'http://example.org'
    var term = new NamedNode(iri)

    assert.equal(term.toCanonical(), '<' + iri + '>')
  })
})
