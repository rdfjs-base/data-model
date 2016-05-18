'use strict'

const BlankNode = require('./blank-node')
const DefaultGraph = require('./default-graph')
const Literal = require('./literal')
const NamedNode = require('./named-node')
const Quad = require('./quad')
const Variable = require('./variable')

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
      } else {
        return new Literal(value, null, DataFactory.namedNode(languageOrDatatype))
      }
    } else {
      return new Literal(value, null, languageOrDatatype)
    }
  }

  static variable (value) {
    return new Variable(value)
  }

  static defaultGraph () {
    return DataFactory.defaultGraphInstance
  }

  static triple (subject, predicate, object) {
    return DataFactory.quad(subject, predicate, object)
  }

  static quad (subject, predicate, object, graph) {
    return new Quad(subject, predicate, object, graph || DataFactory.defaultGraphInstance)
  }
}

DataFactory.defaultGraphInstance = new DefaultGraph()

module.exports = DataFactory
