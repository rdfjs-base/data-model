'use strict'

/* global describe, it */

var assert = require('assert')

function runTests (DataFactory) {
  describe('.blankNode', function () {
    it('should be a static method', function () {
      assert.strictEqual(typeof DataFactory.blankNode, 'function')
    })

    it('should create an object with a termType property that contains the value "BlankNode"', function () {
      var term = DataFactory.blankNode()

      assert.strictEqual(term.termType, 'BlankNode')
    })

    it('should create an object with a value property that contains a unique identifier', function () {
      var term1 = DataFactory.blankNode()
      var term2 = DataFactory.blankNode()

      assert.notStrictEqual(term1.value, term2.value)
    })

    it('should create an object with a value property that contains the given identifier', function () {
      var id = 'b1'
      var term = DataFactory.blankNode(id)

      assert.strictEqual(term.value, id)
    })

    describe('.equals', function () {
      it('should be a method', function () {
        var term = DataFactory.blankNode()

        assert.strictEqual(typeof term.equals, 'function')
      })

      it('should return true if termType and value are equal', function () {
        var id = 'b1'
        var term = DataFactory.blankNode(id)
        var mock = { termType: 'BlankNode', value: id }

        assert.strictEqual(term.equals(mock), true)
      })

      it('should return false if termType is not equal', function () {
        var id = 'b1'
        var term = DataFactory.blankNode(id)
        var mock = { termType: 'NamedNode', value: id }

        assert.strictEqual(term.equals(mock), false)
      })

      it('should return false if value is not equal', function () {
        var id = 'b1'
        var term = DataFactory.blankNode(id)
        var mock = { termType: 'BlankNode', value: id + '1' }

        assert.strictEqual(term.equals(mock), false)
      })

      it('should return false if value is falsy', function () {
        var id = 'b1'
        var term = DataFactory.blankNode(id)

        assert.strictEqual(term.equals(null), false)
      })
    })
  })
}

module.exports = runTests
