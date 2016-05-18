'use strict'

/* global describe, it */

const assert = require('assert')
const Literal = require('../lib/literal')
const NamedNode = require('../lib/named-node')

describe('Literal', () => {
  it('should be a constructor', () => {
    assert.equal(typeof Literal, 'function')
  })

  it('should create an object with .termType set to "Literal"', () => {
    let value = 'example'
    let term = new Literal(value)

    assert.equal(term.termType, 'Literal')
  })

  it('should create an object with .value set to the value from the given constructor argument', () => {
    let value = 'example'
    let term = new Literal(value)

    assert.equal(term.value, value)
  })

  it('should create an object with .value and .language set to the values from the given constructor arguments', () => {
    let value = 'example'
    let language = 'en'
    let term = new Literal(value, language)

    assert.equal(term.language, language)
  })

  it('should create an object with .value and .datatype set to the values from the given constructor arguments', () => {
    let value = 'example'
    let datatype = new NamedNode('http://example.org')
    let term = new Literal(value, null, datatype)

    assert.equal(term.datatype.equals(datatype), true)
  })

  it('should create an object and automatically set the datatype', () => {
    let value = 'example'
    let language = 'en'
    let term1 = new Literal(value)
    let term2 = new Literal(value, language)

    assert.equal(term1.datatype.equals(new NamedNode('http://www.w3.org/2001/XMLSchema#string')), true)
    assert.equal(term2.datatype.equals(new NamedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#langString')), true)
  })

  it('.equals should return true if the other term is a Literal with the same value, language and datatype', () => {
    let value = 'example'
    let term1 = new Literal(value)
    let term2 = new Literal(value)

    assert.equal(term1.equals(term2), true)
  })

  it('.equals should return false if the other term is not a Literal', () => {
    let value = 'example'
    let term1 = new Literal(value)
    let term2 = {termType: 'BlankNode', value: value, language: term1.language, datatype: term1.datatype}

    assert.equal(term1.equals(term2), false)
  })

  it('.equals should return false if the other term is a Literal with a different value', () => {
    let value1 = 'example'
    let value2 = 'test'
    let term1 = new Literal(value1)
    let term2 = new Literal(value2)

    assert.equal(term1.equals(term2), false)
  })

  it('.equals should return false if the other term is a Literal with a different language', () => {
    let value = 'example'
    let term1 = new Literal(value, 'en')
    let term2 = new Literal(value, 'de')

    assert.equal(term1.equals(term2), false)
  })

  it('.equals should return false if the other term is a Literal with a different datatype', () => {
    let value = 'example'
    let datatype1 = new NamedNode('http://example.org')
    let datatype2 = new NamedNode('http://example.com')
    let term1 = new Literal(value, null, datatype1)
    let term2 = new Literal(value, null, datatype2)

    assert.equal(term1.equals(term2), false)
  })

  it('.toCanonical should return a canonical representation', () => {
    let value = 'example'
    let term = new Literal(value)

    assert.equal(term.toCanonical(), '"' + value + '"')
  })
})
