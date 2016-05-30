'use strict'

/* global describe, it */

var assert = require('assert')
var BlankNode = require('../lib/blank-node')

describe('BlankNode', function () {
  it('should be a constructor', function () {
    assert.equal(typeof BlankNode, 'function')
  })

  it('should create an object with .termType set to "BlankNode"', function () {
    var term = new BlankNode()

    assert.equal(term.termType, 'BlankNode')
  })

  it('should create an object with .value set to the value from the given constructor argument', function () {
    var id = 'z0'
    var term = new BlankNode(id)

    assert.equal(term.value, id)
  })

  it('should create an object with an unique .value', function () {
    var term1 = new BlankNode()
    var term2 = new BlankNode()

    assert.equal(term1.value !== term2.value, true)
  })

  it('.equals should return true if the other term is a BlankNode with the same id', function () {
    var id = 'z0'
    var term1 = new BlankNode(id)
    var term2 = new BlankNode(id)

    assert.equal(term1.equals(term2), true)
  })

  it('.equals should return false if the other term is not a BlankNode', function () {
    var id = 'z0'
    var term1 = new BlankNode(id)
    var term2 = {termType: 'NamedNode', value: id}

    assert.equal(term1.equals(term2), false)
  })

  it('.equals should return false if the other term is a BlankNode with a different IRI', function () {
    var id1 = 'z0'
    var id2 = 'z1'
    var term1 = new BlankNode(id1)
    var term2 = new BlankNode(id2)

    assert.equal(term1.equals(term2), false)
  })

  it('.toCanonical should return a canonical representation', function () {
    var id = 'z0'
    var term = new BlankNode(id)

    assert.equal(term.toCanonical(), '_:' + id)
  })
})
