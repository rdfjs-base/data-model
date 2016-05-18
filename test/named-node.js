'use strict'

/* global describe, it */

const assert = require('assert')
const NamedNode = require('../lib/named-node')

describe('NamedNode', () => {
  it('should be a constructor', () => {
    assert.equal(typeof NamedNode, 'function')
  })

  it('should create an object with .termType set to "NamedNode"', () => {
    let iri = 'http://example.org'
    let term = new NamedNode(iri)

    assert.equal(term.termType, 'NamedNode')
  })

  it('should create an object with .value set to the value from the given constructor argument', () => {
    let iri = 'http://example.org'
    let term = new NamedNode(iri)

    assert.equal(term.value, iri)
  })

  it('.equals should return true if the other term is a NamedNode with the same IRI', () => {
    let iri = 'http://example.org'
    let term1 = new NamedNode(iri)
    let term2 = new NamedNode(iri)

    assert.equal(term1.equals(term2), true)
  })

  it('.equals should return false if the other term is not a NamedNode', () => {
    let iri = 'http://example.org'
    let term1 = new NamedNode(iri)
    let term2 = {termType: 'BlankNode', value: iri}

    assert.equal(term1.equals(term2), false)
  })

  it('.equals should return false if the other term is a NamedNode with a different IRI', () => {
    let iri1 = 'http://example.org'
    let iri2 = 'http://example.com'
    let term1 = new NamedNode(iri1)
    let term2 = new NamedNode(iri2)

    assert.equal(term1.equals(term2), false)
  })

  it('.toCanonical should return a canonical representation', () => {
    let iri = 'http://example.org'
    let term = new NamedNode(iri)

    assert.equal(term.toCanonical(), '<' + iri + '>')
  })
})
