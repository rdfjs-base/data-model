'use strict'

/* global describe, it */

var assert = require('assert')
var DefaultGraph = require('../lib/default-graph')

describe('DefaultGraph', function () {
  it('should be a constructor', function () {
    assert.equal(typeof DefaultGraph, 'function')
  })

  it('should create an object with .termType set to "DefaultGraph"', function () {
    var term = new DefaultGraph()

    assert.equal(term.termType, 'DefaultGraph')
  })

  it('.equals should return true if the other term is a DefaultGraph', function () {
    var term1 = new DefaultGraph()
    var term2 = new DefaultGraph()

    assert.equal(term1.equals(term2), true)
  })

  it('.equals should return false if the other term is not a DefaultGraph', function () {
    var term1 = new DefaultGraph()
    var term2 = {termType: 'BlankNode', value: ''}

    assert.equal(term1.equals(term2), false)
  })

  it('.toCanonical should return a canonical representation', function () {
    var term = new DefaultGraph()

    assert.equal(term.toCanonical(), '')
  })
})
