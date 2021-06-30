const { notStrictEqual, strictEqual, throws } = require('assert')
const { describe, it } = require('mocha')

function runTests (DataFactory) {
  describe('.fromTerm', function () {
    it('should be a static method', function () {
      strictEqual(typeof DataFactory.fromTerm, 'function')
    })

    it('should create a clone of the given BlankNode', () => {
      const original = DataFactory.blankNode()

      const term = DataFactory.fromTerm(original)

      strictEqual(term.equals(original), true)
      notStrictEqual(term, original)
    })

    it('should create a clone of the given DefaultGraph', () => {
      const original = DataFactory.defaultGraph()

      const term = DataFactory.fromTerm(original)

      strictEqual(term.equals(original), true)
    })

    it('should create a clone of the given Literal', () => {
      const original = DataFactory.literal('example')

      const term = DataFactory.fromTerm(original)

      strictEqual(term.equals(original), true)
      notStrictEqual(term, original)
    })

    it('should create a clone of the given Literal with language', () => {
      const original = DataFactory.literal('example', 'en')

      const term = DataFactory.fromTerm(original)

      strictEqual(term.equals(original), true)
      notStrictEqual(term, original)
    })

    it('should create a clone of the given Literal with datatype', () => {
      const original = DataFactory.literal('example', DataFactory.namedNode('http://example.org/'))

      const term = DataFactory.fromTerm(original)

      strictEqual(term.equals(original), true)
      notStrictEqual(term, original)
      notStrictEqual(term.datatype, original.datatype)
    })

    it('should create a clone of the given NamedNode', () => {
      const original = DataFactory.namedNode('http://example.org/')

      const term = DataFactory.fromTerm(original)

      strictEqual(term.equals(original), true)
      notStrictEqual(term, original)
    })

    it('should create a clone of the given Quad', () => {
      const subject = DataFactory.blankNode()
      const predicate = DataFactory.namedNode('http://example.org/predicate')
      const object = DataFactory.literal('example')
      const graph = DataFactory.namedNode('http://example.org/graph')
      const original = DataFactory.quad(subject, predicate, object, graph)

      const term = DataFactory.fromTerm(original)

      strictEqual(term.equals(original), true)
      notStrictEqual(term, original)
      notStrictEqual(term.subject, original.subject)
      notStrictEqual(term.predicate, original.predicate)
      notStrictEqual(term.object, original.object)
      notStrictEqual(term.graph, original.graph)
    })

    it('should create a clone of the given Variable', () => {
      const original = DataFactory.variable('v')

      const term = DataFactory.fromTerm(original)

      strictEqual(term.equals(original), true)
      notStrictEqual(term, original)
    })

    it('should return null if null is given', () => {
      const term = DataFactory.fromTerm(null)

      strictEqual(term, null)
    })

    it('should throw an error if an unknown object is given', () => {
      const original = {}

      throws(() => {
        DataFactory.fromTerm(original)
      })
    })
  })
}

module.exports = runTests
