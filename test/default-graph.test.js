const { strictEqual } = require('assert')
const { describe, it } = require('mocha')

function runTests (DataFactory) {
  describe('.defaultGraph', function () {
    it('should be a static method', function () {
      strictEqual(typeof DataFactory.defaultGraph, 'function')
    })

    it('should create an object with a termType property that contains the value "DefaultGraph"', function () {
      const term = DataFactory.defaultGraph()

      strictEqual(term.termType, 'DefaultGraph')
    })

    it('should create an object with a value property that contains an empty string', function () {
      const term = DataFactory.defaultGraph()

      strictEqual(term.value, '')
    })

    describe('.equals', function () {
      it('should be a method', function () {
        const term = DataFactory.defaultGraph()

        strictEqual(typeof term.equals, 'function')
      })

      it('should return true if termType and value are equal', function () {
        const term = DataFactory.defaultGraph()
        const mock = { termType: 'DefaultGraph', value: '' }

        strictEqual(term.equals(mock), true)
      })

      it('should return false if termType is not equal', function () {
        const term = DataFactory.defaultGraph()
        const mock = { termType: 'NamedNode', value: '' }

        strictEqual(term.equals(mock), false)
      })

      it('should return false if value is falsy', function () {
        const term = DataFactory.defaultGraph()

        strictEqual(term.equals(null), false)
      })
    })
  })
}

module.exports = runTests
