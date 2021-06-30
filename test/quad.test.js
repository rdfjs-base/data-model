const { strictEqual } = require('assert')
const { describe, it } = require('mocha')

function runTests (DataFactory) {
  describe('.quad', function () {
    it('should be a static method', function () {
      strictEqual(typeof DataFactory.quad, 'function')
    })

    it('should create an object with .subject, .predicate, .object and .graph with the given values', function () {
      const subject = DataFactory.namedNode('http://example.org/subject')
      const predicate = DataFactory.namedNode('http://example.org/predicate')
      const object = DataFactory.namedNode('http://example.org/object')
      const graph = DataFactory.namedNode('http://example.org/graph')
      const quad = DataFactory.quad(subject, predicate, object, graph)

      strictEqual(subject.equals(quad.subject), true)
      strictEqual(predicate.equals(quad.predicate), true)
      strictEqual(object.equals(quad.object), true)
      strictEqual(graph.equals(quad.graph), true)

      strictEqual(quad.termType, 'Quad')
      strictEqual(quad.value, '')
    })

    it('should create an object .graph set to DefaultGraph if the argument isn\'t given', function () {
      const subject = DataFactory.namedNode('http://example.org/subject')
      const predicate = DataFactory.namedNode('http://example.org/predicate')
      const object = DataFactory.namedNode('http://example.org/object')
      const graph = DataFactory.defaultGraph()
      const quad = DataFactory.quad(subject, predicate, object)

      strictEqual(quad.graph.equals(graph), true)

      strictEqual(quad.termType, 'Quad')
      strictEqual(quad.value, '')
    })

    describe('.equals', function () {
      it('should return true if the other quad contains the same subject, predicate, object and graph', function () {
        const subject = DataFactory.namedNode('http://example.org/subject')
        const predicate = DataFactory.namedNode('http://example.org/predicate')
        const object = DataFactory.namedNode('http://example.org/object')
        const graph = DataFactory.namedNode('http://example.org/graph')
        const quad1 = DataFactory.quad(subject, predicate, object, graph)
        const quad2 = DataFactory.quad(subject, predicate, object, graph)

        strictEqual(quad1.equals(quad2), true)
      })

      it('should return true even if the other equal quad is from a non-RDF* factory', function () {
        const subject = DataFactory.namedNode('http://example.org/subject')
        const predicate = DataFactory.namedNode('http://example.org/predicate')
        const object = DataFactory.namedNode('http://example.org/object')
        const graph = DataFactory.namedNode('http://example.org/graph')
        const quad1 = DataFactory.quad(subject, predicate, object, graph)
        const quad2 = { subject, predicate, object, graph }

        strictEqual(quad1.equals(quad2), true)
      })

      it('should return false if the subject of the other quad is not the same', function () {
        const subject1 = DataFactory.namedNode('http://example.org/subject')
        const subject2 = DataFactory.namedNode('http://example.com/subject')
        const predicate = DataFactory.namedNode('http://example.org/predicate')
        const object = DataFactory.namedNode('http://example.org/object')
        const graph = DataFactory.namedNode('http://example.org/graph')
        const quad1 = DataFactory.quad(subject1, predicate, object, graph)
        const quad2 = DataFactory.quad(subject2, predicate, object, graph)

        strictEqual(quad1.equals(quad2), false)
      })

      it('should return false even if the other non-equal quad is from a non-RDF* factory', function () {
        const subject1 = DataFactory.namedNode('http://example.org/subject')
        const subject2 = DataFactory.namedNode('http://example.com/subject')
        const predicate = DataFactory.namedNode('http://example.org/predicate')
        const object = DataFactory.namedNode('http://example.org/object')
        const graph = DataFactory.namedNode('http://example.org/graph')
        const quad1 = DataFactory.quad(subject1, predicate, object, graph)
        const quad2 = { subject: subject2, predicate, object, graph }

        strictEqual(quad1.equals(quad2), false)
      })

      it('should return false if the predicate of the other quad is not the same', function () {
        const subject = DataFactory.namedNode('http://example.org/subject')
        const predicate1 = DataFactory.namedNode('http://example.org/predicate')
        const predicate2 = DataFactory.namedNode('http://example.com/predicate')
        const object = DataFactory.namedNode('http://example.org/object')
        const graph = DataFactory.namedNode('http://example.org/graph')
        const quad1 = DataFactory.quad(subject, predicate1, object, graph)
        const quad2 = DataFactory.quad(subject, predicate2, object, graph)

        strictEqual(quad1.equals(quad2), false)
      })

      it('should return false if the object of the other quad is not the same', function () {
        const subject = DataFactory.namedNode('http://example.org/subject')
        const predicate = DataFactory.namedNode('http://example.org/predicate')
        const object1 = DataFactory.namedNode('http://example.org/object')
        const object2 = DataFactory.namedNode('http://example.com/object')
        const graph = DataFactory.namedNode('http://example.org/graph')
        const quad1 = DataFactory.quad(subject, predicate, object1, graph)
        const quad2 = DataFactory.quad(subject, predicate, object2, graph)

        strictEqual(quad1.equals(quad2), false)
      })

      it('should return false if the graph of the other quad is not the same', function () {
        const subject = DataFactory.namedNode('http://example.org/subject')
        const predicate = DataFactory.namedNode('http://example.org/predicate')
        const object = DataFactory.namedNode('http://example.org/object')
        const graph1 = DataFactory.namedNode('http://example.org/graph')
        const graph2 = DataFactory.namedNode('http://example.com/graph')
        const quad1 = DataFactory.quad(subject, predicate, object, graph1)
        const quad2 = DataFactory.quad(subject, predicate, object, graph2)

        strictEqual(quad1.equals(quad2), false)
      })

      it('should return false if value is falsy', function () {
        const subject = DataFactory.namedNode('http://example.org/subject')
        const predicate = DataFactory.namedNode('http://example.org/predicate')
        const object = DataFactory.namedNode('http://example.org/object')
        const graph = DataFactory.namedNode('http://example.org/graph')
        const quad = DataFactory.quad(subject, predicate, object, graph)

        strictEqual(quad.equals(null), false)
      })

      it('should return false if value is another term', function () {
        const subject = DataFactory.namedNode('http://example.org/subject')
        const predicate = DataFactory.namedNode('http://example.org/predicate')
        const object = DataFactory.namedNode('http://example.org/object')
        const graph = DataFactory.namedNode('http://example.org/graph')
        const quad = DataFactory.quad(subject, predicate, object, graph)

        strictEqual(quad.equals(DataFactory.namedNode('http://example.org/subject')), false)
        strictEqual(quad.equals(DataFactory.literal('abc')), false)
        strictEqual(quad.equals(DataFactory.variable('var')), false)
        strictEqual(quad.equals(DataFactory.blankNode('bnode')), false)
        strictEqual(quad.equals(DataFactory.defaultGraph()), false)
      })

      it('should return true for an equal nested quad', function () {
        const subject = DataFactory.quad(
          DataFactory.namedNode('http://example.org/subjectInner1'),
          DataFactory.namedNode('http://example.org/predicateInner1'),
          DataFactory.namedNode('http://example.org/objectInner1')
        )
        const predicate = DataFactory.namedNode('http://example.org/predicate')
        const object = DataFactory.quad(
          DataFactory.namedNode('http://example.org/subjectInner2'),
          DataFactory.namedNode('http://example.org/predicateInner2'),
          DataFactory.namedNode('http://example.org/objectInner2'),
          DataFactory.namedNode('http://example.org/graphInner2')
        )
        const graph = DataFactory.namedNode('http://example.org/graph')
        const quad1 = DataFactory.quad(subject, predicate, object, graph)
        const quad2 = DataFactory.quad(subject, predicate, object, graph)

        strictEqual(quad1.equals(quad2), true)
      })
    })
  })
}

module.exports = runTests
