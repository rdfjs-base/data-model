const { strictEqual } = require('assert')
const { describe, it } = require('mocha')

function runTests (DataFactory) {
  describe('.triple', function () {
    it('should be a static method', function () {
      strictEqual(typeof DataFactory.triple, 'function')
    })

    it('should create an object with .subject, .predicate and .object with the given values and .graph set to DefaultGraph', function () {
      const subject = DataFactory.namedNode('http://example.org/subject')
      const predicate = DataFactory.namedNode('http://example.org/predicate')
      const object = DataFactory.namedNode('http://example.org/object')
      const triple = DataFactory.triple(subject, predicate, object)

      strictEqual(subject.equals(triple.subject), true)
      strictEqual(predicate.equals(triple.predicate), true)
      strictEqual(object.equals(triple.object), true)
      strictEqual(DataFactory.defaultGraph().equals(triple.graph), true)
    })

    it('should ignore a 4th parameter and always use DefaultGraph', function () {
      const subject = DataFactory.namedNode('http://example.org/subject')
      const predicate = DataFactory.namedNode('http://example.org/predicate')
      const object = DataFactory.namedNode('http://example.org/object')
      const graph = DataFactory.namedNode('http://example.org/graph')
      const triple = DataFactory.triple(subject, predicate, object, graph)

      strictEqual(DataFactory.defaultGraph().equals(triple.graph), true)
    })

    describe('.equals', function () {
      it('should return true if the other triple contains the same subject, predicate and object', function () {
        const subject = DataFactory.namedNode('http://example.org/subject')
        const predicate = DataFactory.namedNode('http://example.org/predicate')
        const object = DataFactory.namedNode('http://example.org/object')
        const triple1 = DataFactory.triple(subject, predicate, object)
        const triple2 = DataFactory.triple(subject, predicate, object)

        strictEqual(triple1.equals(triple2), true)
      })

      it('should return false if the subject of the other triple is not the same', function () {
        const subject1 = DataFactory.namedNode('http://example.org/subject')
        const subject2 = DataFactory.namedNode('http://example.com/subject')
        const predicate = DataFactory.namedNode('http://example.org/predicate')
        const object = DataFactory.namedNode('http://example.org/object')
        const triple1 = DataFactory.triple(subject1, predicate, object)
        const triple2 = DataFactory.triple(subject2, predicate, object)

        strictEqual(triple1.equals(triple2), false)
      })

      it('should return false if the predicate of the other triple is not the same', function () {
        const subject = DataFactory.namedNode('http://example.org/subject')
        const predicate1 = DataFactory.namedNode('http://example.org/predicate')
        const predicate2 = DataFactory.namedNode('http://example.com/predicate')
        const object = DataFactory.namedNode('http://example.org/object')
        const triple1 = DataFactory.triple(subject, predicate1, object)
        const triple2 = DataFactory.triple(subject, predicate2, object)

        strictEqual(triple1.equals(triple2), false)
      })

      it('should return false if the object of the other triple is not the same', function () {
        const subject = DataFactory.namedNode('http://example.org/subject')
        const predicate = DataFactory.namedNode('http://example.org/predicate')
        const object1 = DataFactory.namedNode('http://example.org/object')
        const object2 = DataFactory.namedNode('http://example.com/object')
        const triple1 = DataFactory.triple(subject, predicate, object1)
        const triple2 = DataFactory.triple(subject, predicate, object2)

        strictEqual(triple1.equals(triple2), false)
      })

      it('should return false if the graph of the other quad is not the same', function () {
        const subject = DataFactory.namedNode('http://example.org/subject')
        const predicate = DataFactory.namedNode('http://example.org/predicate')
        const object = DataFactory.namedNode('http://example.org/object')
        const graph = DataFactory.namedNode('http://example.org/graph')
        const triple = DataFactory.triple(subject, predicate, object)
        const quad = DataFactory.quad(subject, predicate, object, graph)

        strictEqual(triple.equals(quad), false)
      })

      it('should return false if value is falsy', function () {
        const subject = DataFactory.namedNode('http://example.org/subject')
        const predicate = DataFactory.namedNode('http://example.org/predicate')
        const object = DataFactory.namedNode('http://example.org/object')
        const triple = DataFactory.triple(subject, predicate, object)

        strictEqual(triple.equals(null), false)
      })
    })
  })
}

module.exports = runTests
