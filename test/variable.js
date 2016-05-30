'use strict'

/* global describe, it */

var assert = require('assert')
var Variable = require('../lib/variable')

describe('Variable', function () {
  it('should be a constructor', function () {
    assert.equal(typeof Variable, 'function')
  })

  it('should create an object with .termType set to "Variable"', function () {
    var name = 'example'
    var term = new Variable(name)

    assert.equal(term.termType, 'Variable')
  })

  it('should create an object with .value set to the value from the given constructor argument', function () {
    var name = 'example'
    var term = new Variable(name)

    assert.equal(term.value, name)
  })

  it('.equals should return true if the other term is a Variable with the same name', function () {
    var name = 'example'
    var term1 = new Variable(name)
    var term2 = new Variable(name)

    assert.equal(term1.equals(term2), true)
  })

  it('.equals should return false if the other term is not a Variable', function () {
    var name = 'example'
    var term1 = new Variable(name)
    var term2 = {termType: 'BlankNode', value: name}

    assert.equal(term1.equals(term2), false)
  })

  it('.equals should return false if the other term is a Variable with a different name', function () {
    var name1 = 'example'
    var name2 = 'test'
    var term1 = new Variable(name1)
    var term2 = new Variable(name2)

    assert.equal(term1.equals(term2), false)
  })

  it('.toCanonical should return a canonical representation', function () {
    var name = 'example'
    var term = new Variable(name)

    assert.equal(term.toCanonical(), '?' + name)
  })
})
