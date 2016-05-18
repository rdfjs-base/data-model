'use strict'

/* global describe, it */

const assert = require('assert')
const DefaultGraph = require('../lib/default-graph')

describe('DefaultGraph', () => {
  it('should be a constructor', () => {
    assert.equal(typeof DefaultGraph, 'function')
  })

  it('should create an object with .termType set to "DefaultGraph"', () => {
    let term = new DefaultGraph()

    assert.equal(term.termType, 'DefaultGraph')
  })

  it('.equals should return true if the other term is a DefaultGraph', () => {
    let term1 = new DefaultGraph()
    let term2 = new DefaultGraph()

    assert.equal(term1.equals(term2), true)
  })

  it('.equals should return false if the other term is not a DefaultGraph', () => {
    let term1 = new DefaultGraph()
    let term2 = {termType: 'BlankNode', value: ''}

    assert.equal(term1.equals(term2), false)
  })

  it('.toCanonical should return a canonical representation', () => {
    let term = new DefaultGraph()

    assert.equal(term.toCanonical(), '')
  })
})
