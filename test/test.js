const { strictEqual } = require('assert')
const { describe, it } = require('mocha')
const rdf = require('..')

describe('@rdfjs/data-model', () => {
  require('.')(rdf)

  // .triple is a legacy method and not required according to the spec
  require('./triple.test.js')(rdf)

  it('should allow destructuring assignment of factory methods', () => {
    const factory = { ...rdf }

    strictEqual(typeof factory.namedNode, 'function')
    strictEqual(typeof factory.blankNode, 'function')
    strictEqual(typeof factory.literal, 'function')
    strictEqual(typeof factory.variable, 'function')
    strictEqual(typeof factory.defaultGraph, 'function')
    strictEqual(typeof factory.quad, 'function')
    strictEqual(typeof factory.fromTerm, 'function')
    strictEqual(typeof factory.fromQuad, 'function')
  })
})
