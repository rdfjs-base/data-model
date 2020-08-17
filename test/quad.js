'use strict'

/* global describe, it */

var assert = require('assert')

function runTests (DataFactory) {
  describe('.quad', function () {
    it('should be a static method', function () {
      assert.strictEqual(typeof DataFactory.quad, 'function')
    })

    it('should create an object with .subject, .predicate, .object and .graph with the given values', function () {
      var subject = DataFactory.namedNode('http://example.org/subject')
      var predicate = DataFactory.namedNode('http://example.org/predicate')
      var object = DataFactory.namedNode('http://example.org/object')
      var graph = DataFactory.namedNode('http://example.org/graph')
      var quad = DataFactory.quad(subject, predicate, object, graph)

      assert.strictEqual(subject.equals(quad.subject), true)
      assert.strictEqual(predicate.equals(quad.predicate), true)
      assert.strictEqual(object.equals(quad.object), true)
      assert.strictEqual(graph.equals(quad.graph), true)

      assert.strictEqual(quad.termType, 'Quad')
      assert.strictEqual(quad.value, '')
    })

    it('should create an object .graph set to DefaultGraph if the argument isn\'t given', function () {
      var subject = DataFactory.namedNode('http://example.org/subject')
      var predicate = DataFactory.namedNode('http://example.org/predicate')
      var object = DataFactory.namedNode('http://example.org/object')
      var graph = DataFactory.defaultGraph()
      var quad = DataFactory.quad(subject, predicate, object)

      assert.strictEqual(quad.graph.equals(graph), true)

      assert.strictEqual(quad.termType, 'Quad')
      assert.strictEqual(quad.value, '')
    })

    describe('.equals', function () {
      it('should return true if the other quad contains the same subject, predicate, object and graph', function () {
        var subject = DataFactory.namedNode('http://example.org/subject')
        var predicate = DataFactory.namedNode('http://example.org/predicate')
        var object = DataFactory.namedNode('http://example.org/object')
        var graph = DataFactory.namedNode('http://example.org/graph')
        var quad1 = DataFactory.quad(subject, predicate, object, graph)
        var quad2 = DataFactory.quad(subject, predicate, object, graph)

        assert.strictEqual(quad1.equals(quad2), true)
      })

      it('should return true even if the other equal quad is from a non-RDF* factory', function () {
        var subject = DataFactory.namedNode('http://example.org/subject')
        var predicate = DataFactory.namedNode('http://example.org/predicate')
        var object = DataFactory.namedNode('http://example.org/object')
        var graph = DataFactory.namedNode('http://example.org/graph')
        var quad1 = DataFactory.quad(subject, predicate, object, graph)
        var quad2 = { subject, predicate, object, graph }

        assert.strictEqual(quad1.equals(quad2), true)
      })

      it('should return false if the subject of the other quad is not the same', function () {
        var subject1 = DataFactory.namedNode('http://example.org/subject')
        var subject2 = DataFactory.namedNode('http://example.com/subject')
        var predicate = DataFactory.namedNode('http://example.org/predicate')
        var object = DataFactory.namedNode('http://example.org/object')
        var graph = DataFactory.namedNode('http://example.org/graph')
        var quad1 = DataFactory.quad(subject1, predicate, object, graph)
        var quad2 = DataFactory.quad(subject2, predicate, object, graph)

        assert.strictEqual(quad1.equals(quad2), false)
      })

      it('should return false even if the other non-equal quad is from a non-RDF* factory', function () {
        var subject1 = DataFactory.namedNode('http://example.org/subject')
        var subject2 = DataFactory.namedNode('http://example.com/subject')
        var predicate = DataFactory.namedNode('http://example.org/predicate')
        var object = DataFactory.namedNode('http://example.org/object')
        var graph = DataFactory.namedNode('http://example.org/graph')
        var quad1 = DataFactory.quad(subject1, predicate, object, graph)
        var quad2 = { subject: subject2, predicate, object, graph }

        assert.strictEqual(quad1.equals(quad2), false)
      })

      it('should return false if the predicate of the other quad is not the same', function () {
        var subject = DataFactory.namedNode('http://example.org/subject')
        var predicate1 = DataFactory.namedNode('http://example.org/predicate')
        var predicate2 = DataFactory.namedNode('http://example.com/predicate')
        var object = DataFactory.namedNode('http://example.org/object')
        var graph = DataFactory.namedNode('http://example.org/graph')
        var quad1 = DataFactory.quad(subject, predicate1, object, graph)
        var quad2 = DataFactory.quad(subject, predicate2, object, graph)

        assert.strictEqual(quad1.equals(quad2), false)
      })

      it('should return false if the object of the other quad is not the same', function () {
        var subject = DataFactory.namedNode('http://example.org/subject')
        var predicate = DataFactory.namedNode('http://example.org/predicate')
        var object1 = DataFactory.namedNode('http://example.org/object')
        var object2 = DataFactory.namedNode('http://example.com/object')
        var graph = DataFactory.namedNode('http://example.org/graph')
        var quad1 = DataFactory.quad(subject, predicate, object1, graph)
        var quad2 = DataFactory.quad(subject, predicate, object2, graph)

        assert.strictEqual(quad1.equals(quad2), false)
      })

      it('should return false if the graph of the other quad is not the same', function () {
        var subject = DataFactory.namedNode('http://example.org/subject')
        var predicate = DataFactory.namedNode('http://example.org/predicate')
        var object = DataFactory.namedNode('http://example.org/object')
        var graph1 = DataFactory.namedNode('http://example.org/graph')
        var graph2 = DataFactory.namedNode('http://example.com/graph')
        var quad1 = DataFactory.quad(subject, predicate, object, graph1)
        var quad2 = DataFactory.quad(subject, predicate, object, graph2)

        assert.strictEqual(quad1.equals(quad2), false)
      })

      it('should return false if value is falsy', function () {
        var subject = DataFactory.namedNode('http://example.org/subject')
        var predicate = DataFactory.namedNode('http://example.org/predicate')
        var object = DataFactory.namedNode('http://example.org/object')
        var graph = DataFactory.namedNode('http://example.org/graph')
        var quad = DataFactory.quad(subject, predicate, object, graph)

        assert.strictEqual(quad.equals(null), false)
      })

      it('should return false if value is another term', function () {
        var subject = DataFactory.namedNode('http://example.org/subject')
        var predicate = DataFactory.namedNode('http://example.org/predicate')
        var object = DataFactory.namedNode('http://example.org/object')
        var graph = DataFactory.namedNode('http://example.org/graph')
        var quad = DataFactory.quad(subject, predicate, object, graph)

        assert.strictEqual(quad.equals(DataFactory.namedNode('http://example.org/subject')), false)
        assert.strictEqual(quad.equals(DataFactory.literal('abc')), false)
        assert.strictEqual(quad.equals(DataFactory.variable('var')), false)
        assert.strictEqual(quad.equals(DataFactory.blankNode('bnode')), false)
        assert.strictEqual(quad.equals(DataFactory.defaultGraph()), false)
      })

      it('should return true for an equal nested quad', function () {
        var subject = DataFactory.quad(
          DataFactory.namedNode('http://example.org/subjectInner1'),
          DataFactory.namedNode('http://example.org/predicateInner1'),
          DataFactory.namedNode('http://example.org/objectInner1')
        )
        var predicate = DataFactory.namedNode('http://example.org/predicate')
        var object = DataFactory.quad(
          DataFactory.namedNode('http://example.org/subjectInner2'),
          DataFactory.namedNode('http://example.org/predicateInner2'),
          DataFactory.namedNode('http://example.org/objectInner2'),
          DataFactory.namedNode('http://example.org/graphInner2')
        )
        var graph = DataFactory.namedNode('http://example.org/graph')
        var quad1 = DataFactory.quad(subject, predicate, object, graph)
        var quad2 = DataFactory.quad(subject, predicate, object, graph)

        assert.strictEqual(quad1.equals(quad2), true)
      })
    })
  })
}

module.exports = runTests
