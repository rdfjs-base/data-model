const BlankNode = require('./BlankNode.js')
const DefaultGraph = require('./DefaultGraph.js')
const fromTerm = require('./fromTerm.js')
const Literal = require('./Literal.js')
const NamedNode = require('./NamedNode.js')
const Quad = require('./Quad.js')
const Variable = require('./Variable.js')

class DataFactory {
  static namedNode (value) {
    return new NamedNode(value)
  }

  static blankNode (value) {
    return new BlankNode(value)
  }

  static literal (value, languageOrDatatype) {
    if (typeof languageOrDatatype === 'string') {
      if (languageOrDatatype.indexOf(':') === -1) {
        return new Literal(value, languageOrDatatype)
      }

      return new Literal(value, null, DataFactory.namedNode(languageOrDatatype))
    }

    return new Literal(value, null, languageOrDatatype)
  }

  static defaultGraph () {
    return DataFactory.defaultGraphInstance
  }

  static variable (value) {
    return new Variable(value)
  }

  static triple (subject, predicate, object) {
    return DataFactory.quad(subject, predicate, object)
  }

  static quad (subject, predicate, object, graph) {
    return new Quad(subject, predicate, object, graph || DataFactory.defaultGraphInstance)
  }

  static fromQuad (original) {
    return fromTerm.call(DataFactory, original)
  }

  static fromTerm (original) {
    return fromTerm.call(DataFactory, original)
  }
}

DataFactory.defaultGraphInstance = new DefaultGraph()

module.exports = DataFactory
