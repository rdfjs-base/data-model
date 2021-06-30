const { strictEqual } = require('assert')
const { describe, it } = require('mocha')

function runTests (DataFactory) {
  describe('.namedNode', function () {
    it('should be a static method', function () {
      strictEqual(typeof DataFactory.namedNode, 'function')
    })

    it('should create an object with a termType property that contains the value "NamedNode"', function () {
      const iri = 'http://example.org'
      const term = DataFactory.namedNode(iri)

      strictEqual(term.termType, 'NamedNode')
    })

    it('should create an object with a value property that contains the given IRI', function () {
      const iri = 'http://example.org'
      const term = DataFactory.namedNode(iri)

      strictEqual(term.value, iri)
    })

    describe('.equals', function () {
      it('should be a method', function () {
        const iri = 'http://example.org'
        const term = DataFactory.namedNode(iri)

        strictEqual(typeof term.equals, 'function')
      })

      it('should return true if termType and value are equal', function () {
        const iri = 'http://example.org'
        const term = DataFactory.namedNode(iri)
        const mock = { termType: 'NamedNode', value: iri }

        strictEqual(term.equals(mock), true)
      })

      it('should return false if termType is not equal', function () {
        const iri = 'http://example.org'
        const term = DataFactory.namedNode(iri)
        const mock = { termType: 'BlankNode', value: iri }

        strictEqual(term.equals(mock), false)
      })

      it('should return false if value is not equal', function () {
        const iri = 'http://example.org'
        const term = DataFactory.namedNode(iri)
        const mock = { termType: 'NamedNode', value: iri + '1' }

        strictEqual(term.equals(mock), false)
      })

      it('should return false if value is falsy', function () {
        const iri = 'http://example.org'
        const term = DataFactory.namedNode(iri)

        strictEqual(term.equals(null), false)
      })
    })
  })
}

module.exports = runTests
