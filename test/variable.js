'use strict'

/* global describe, it */

const assert = require('assert')
const Variable = require('../lib/variable')

describe('Variable', () => {
  it('should be a constructor', () => {
    assert.equal(typeof Variable, 'function')
  })

  it('should create an object with .termType set to "Variable"', () => {
    let name = 'example'
    let term = new Variable(name)

    assert.equal(term.termType, 'Variable')
  })

  it('should create an object with .value set to the value from the given constructor argument', () => {
    let name = 'example'
    let term = new Variable(name)

    assert.equal(term.value, name)
  })

  it('.equals should return true if the other term is a Variable with the same name', () => {
    let name = 'example'
    let term1 = new Variable(name)
    let term2 = new Variable(name)

    assert.equal(term1.equals(term2), true)
  })

  it('.equals should return false if the other term is not a Variable', () => {
    let name = 'example'
    let term1 = new Variable(name)
    let term2 = {termType: 'BlankNode', value: name}

    assert.equal(term1.equals(term2), false)
  })

  it('.equals should return false if the other term is a Variable with a different name', () => {
    let name1 = 'example'
    let name2 = 'test'
    let term1 = new Variable(name1)
    let term2 = new Variable(name2)

    assert.equal(term1.equals(term2), false)
  })

  it('.toCanonical should return a canonical representation', () => {
    let name = 'example'
    let term = new Variable(name)

    assert.equal(term.toCanonical(), '?' + name)
  })
})
