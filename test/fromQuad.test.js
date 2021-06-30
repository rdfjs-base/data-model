const { notStrictEqual, strictEqual, throws } = require('assert')
const { describe, it } = require('mocha')

function runTests (DataFactory) {
  describe('.fromQuad', function () {
    it('should be a static method', function () {
      strictEqual(typeof DataFactory.fromQuad, 'function')
    })

    it('should create a clone of the given Quad', () => {
      const subject = DataFactory.blankNode()
      const predicate = DataFactory.namedNode('http://example.org/predicate')
      const object = DataFactory.literal('example')
      const graph = DataFactory.namedNode('http://example.org/graph')
      const original = DataFactory.quad(subject, predicate, object, graph)

      const term = DataFactory.fromQuad(original)

      strictEqual(term.equals(original), true)
      notStrictEqual(term, original)
      notStrictEqual(term.subject, original.subject)
      notStrictEqual(term.predicate, original.predicate)
      notStrictEqual(term.object, original.object)
      notStrictEqual(term.graph, original.graph)
    })

    it('should return null if null is given', () => {
      const term = DataFactory.fromQuad(null)

      strictEqual(term, null)
    })

    it('should throw an error if an unknown object is given', () => {
      const original = {}

      throws(() => {
        DataFactory.fromQuad(original)
      })
    })
  })
}

module.exports = runTests
