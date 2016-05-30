'use strict'

/* global describe, it */

var assert = require('assert')
var Literal = require('../lib/literal')
var NamedNode = require('../lib/named-node')

describe('Literal', function () {
  it('should be a constructor', function () {
    assert.equal(typeof Literal, 'function')
  })

  it('should create an object with .termType set to "Literal"', function () {
    var value = 'example'
    var term = new Literal(value)

    assert.equal(term.termType, 'Literal')
  })

  it('should create an object with .value set to the value from the given constructor argument', function () {
    var value = 'example'
    var term = new Literal(value)

    assert.equal(term.value, value)
  })

  it('should create an object with .value and .language set to the values from the given constructor arguments', function () {
    var value = 'example'
    var language = 'en'
    var term = new Literal(value, language)

    assert.equal(term.language, language)
  })

  it('should create an object with .value and .datatype set to the values from the given constructor arguments', function () {
    var value = 'example'
    var datatype = new NamedNode('http://example.org')
    var term = new Literal(value, null, datatype)

    assert.equal(term.datatype.equals(datatype), true)
  })

  it('should create an object and automatically set the datatype', function () {
    var value = 'example'
    var language = 'en'
    var term1 = new Literal(value)
    var term2 = new Literal(value, language)

    assert.equal(term1.datatype.equals(new NamedNode('http://www.w3.org/2001/XMLSchema#string')), true)
    assert.equal(term2.datatype.equals(new NamedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#langString')), true)
  })

  it('.equals should return true if the other term is a Literal with the same value, language and datatype', function () {
    var value = 'example'
    var term1 = new Literal(value)
    var term2 = new Literal(value)

    assert.equal(term1.equals(term2), true)
  })

  it('.equals should return false if the other term is not a Literal', function () {
    var value = 'example'
    var term1 = new Literal(value)
    var term2 = {termType: 'BlankNode', value: value, language: term1.language, datatype: term1.datatype}

    assert.equal(term1.equals(term2), false)
  })

  it('.equals should return false if the other term is a Literal with a different value', function () {
    var value1 = 'example'
    var value2 = 'test'
    var term1 = new Literal(value1)
    var term2 = new Literal(value2)

    assert.equal(term1.equals(term2), false)
  })

  it('.equals should return false if the other term is a Literal with a different language', function () {
    var value = 'example'
    var term1 = new Literal(value, 'en')
    var term2 = new Literal(value, 'de')

    assert.equal(term1.equals(term2), false)
  })

  it('.equals should return false if the other term is a Literal with a different datatype', function () {
    var value = 'example'
    var datatype1 = new NamedNode('http://example.org')
    var datatype2 = new NamedNode('http://example.com')
    var term1 = new Literal(value, null, datatype1)
    var term2 = new Literal(value, null, datatype2)

    assert.equal(term1.equals(term2), false)
  })

  it('.toCanonical should return a canonical representation', function () {
    var value = 'example'
    var term = new Literal(value)

    assert.equal(term.toCanonical(), '"' + value + '"')
  })
})
