const { strictEqual } = require('assert')
const { describe, it } = require('mocha')

function runTests (DataFactory) {
  // support for Variable is optional
  if (!DataFactory.variable) {
    return
  }

  describe('.variable', function () {
    it('should be a static method', function () {
      strictEqual(typeof DataFactory.variable, 'function')
    })

    it('should create an object with a termType property that contains the value "Variable"', function () {
      const name = 'v'
      const term = DataFactory.variable(name)

      strictEqual(term.termType, 'Variable')
    })

    it('should create an object with a value property that contains the given name', function () {
      const name = 'v'
      const term = DataFactory.variable(name)

      strictEqual(term.value, name)
    })

    describe('.equals', function () {
      it('should be a method', function () {
        const name = 'v'
        const term = DataFactory.variable(name)

        strictEqual(typeof term.equals, 'function')
      })

      it('should return true if termType and value are equal', function () {
        const name = 'v'
        const term = DataFactory.variable(name)
        const mock = { termType: 'Variable', value: name }

        strictEqual(term.equals(mock), true)
      })

      it('should return false if termType is not equal', function () {
        const name = 'v'
        const term = DataFactory.variable(name)
        const mock = { termType: 'NamedNode', value: name }

        strictEqual(term.equals(mock), false)
      })

      it('should return false if value is not equal', function () {
        const name = 'v'
        const term = DataFactory.variable(name)
        const mock = { termType: 'Variable', value: name + '1' }

        strictEqual(term.equals(mock), false)
      })

      it('should return false if value is falsy', function () {
        const name = 'v'
        const term = DataFactory.variable(name)

        strictEqual(term.equals(null), false)
      })
    })
  })
}

module.exports = runTests
