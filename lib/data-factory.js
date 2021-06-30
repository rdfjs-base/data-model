const BlankNode = require('./blank-node')
const DefaultGraph = require('./default-graph')
const fromTerm = require('./fromTerm')
const Literal = require('./literal')
const NamedNode = require('./named-node')
const Quad = require('./quad')
const Variable = require('./variable')

function DataFactory () {}

DataFactory.namedNode = function (value) {
  return new NamedNode(value)
}

DataFactory.blankNode = function (value) {
  return new BlankNode(value)
}

DataFactory.literal = function (value, languageOrDatatype) {
  if (typeof languageOrDatatype === 'string') {
    if (languageOrDatatype.indexOf(':') === -1) {
      return new Literal(value, languageOrDatatype)
    }

    return new Literal(value, null, DataFactory.namedNode(languageOrDatatype))
  }

  return new Literal(value, null, languageOrDatatype)
}

DataFactory.defaultGraph = function () {
  return DataFactory.defaultGraphInstance
}

DataFactory.variable = function (value) {
  return new Variable(value)
}

DataFactory.triple = function (subject, predicate, object) {
  return DataFactory.quad(subject, predicate, object)
}

DataFactory.quad = function (subject, predicate, object, graph) {
  return new Quad(subject, predicate, object, graph || DataFactory.defaultGraphInstance)
}

DataFactory.fromQuad = fromTerm.bind(DataFactory)
DataFactory.fromTerm = fromTerm.bind(DataFactory)

DataFactory.defaultGraphInstance = new DefaultGraph()

module.exports = DataFactory
