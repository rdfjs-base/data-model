'use strict'

/* global describe, it */

const assert = require('assert')
const BlankNode = require('../lib/blank-node')

describe('BlankNode', () => {
  it('should be a constructor', () => {
    assert.equal(typeof BlankNode, 'function')
  })

  it('should create an object with .termType set to "BlankNode"', () => {
    let term = new BlankNode()

    assert.equal(term.termType, 'BlankNode')
  })

  it('should create an object with .value set to the value from the given constructor argument', () => {
    let id = 'z0'
    let term = new BlankNode(id)

    assert.equal(term.value, id)
  })

  it('should create an object with an unique .value', () => {
    let term1 = new BlankNode()
    let term2 = new BlankNode()

    assert.equal(term1.value !== term2.value, true)
  })

  it('.equals should return true if the other term is a BlankNode with the same id', () => {
    let id = 'z0'
    let term1 = new BlankNode(id)
    let term2 = new BlankNode(id)

    assert.equal(term1.equals(term2), true)
  })

  it('.equals should return false if the other term is not a BlankNode', () => {
    let id = 'z0'
    let term1 = new BlankNode(id)
    let term2 = {termType: 'NamedNode', value: id}

    assert.equal(term1.equals(term2), false)
  })

  it('.equals should return false if the other term is a BlankNode with a different IRI', () => {
    let id1 = 'z0'
    let id2 = 'z1'
    let term1 = new BlankNode(id1)
    let term2 = new BlankNode(id2)

    assert.equal(term1.equals(term2), false)
  })

  it('.toCanonical should return a canonical representation', () => {
    let id = 'z0'
    let term = new BlankNode(id)

    assert.equal(term.toCanonical(), '_:' + id)
  })
})
