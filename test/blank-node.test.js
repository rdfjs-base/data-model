const { strictEqual, notStrictEqual } = require('assert')
const { describe, it } = require('mocha')

function runTests (DataFactory) {
  describe('.blankNode', function () {
    it('should be a static method', function () {
      strictEqual(typeof DataFactory.blankNode, 'function')
    })

    it('should create an object with a termType property that contains the value "BlankNode"', function () {
      const term = DataFactory.blankNode()

      strictEqual(term.termType, 'BlankNode')
    })

    it('should create an object with a value property that contains a unique identifier', function () {
      const term1 = DataFactory.blankNode()
      const term2 = DataFactory.blankNode()

      notStrictEqual(term1.value, term2.value)
    })

    it('should create an object with a value property that contains the given identifier', function () {
      const id = 'b1'
      const term = DataFactory.blankNode(id)

      strictEqual(term.value, id)
    })

    describe('.equals', function () {
      it('should be a method', function () {
        const term = DataFactory.blankNode()

        strictEqual(typeof term.equals, 'function')
      })

      it('should return true if termType and value are equal', function () {
        const id = 'b1'
        const term = DataFactory.blankNode(id)
        const mock = { termType: 'BlankNode', value: id }

        strictEqual(term.equals(mock), true)
      })

      it('should return false if termType is not equal', function () {
        const id = 'b1'
        const term = DataFactory.blankNode(id)
        const mock = { termType: 'NamedNode', value: id }

        strictEqual(term.equals(mock), false)
      })

      it('should return false if value is not equal', function () {
        const id = 'b1'
        const term = DataFactory.blankNode(id)
        const mock = { termType: 'BlankNode', value: id + '1' }

        strictEqual(term.equals(mock), false)
      })

      it('should return false if value is falsy', function () {
        const id = 'b1'
        const term = DataFactory.blankNode(id)

        strictEqual(term.equals(null), false)
      })
    })
  })
}

module.exports = runTests
