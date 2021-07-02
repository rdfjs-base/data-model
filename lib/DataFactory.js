const BlankNode = require('./BlankNode.js')
const DefaultGraph = require('./DefaultGraph.js')
const fromTermRaw = require('./fromTerm.js')
const Literal = require('./Literal.js')
const NamedNode = require('./NamedNode.js')
const Quad = require('./Quad.js')
const Variable = require('./Variable.js')

function namedNode (value) {
  return new NamedNode(value)
}

function blankNode (value) {
  return new BlankNode(value)
}

function literal (value, languageOrDatatype) {
  if (typeof languageOrDatatype === 'string') {
    if (languageOrDatatype.indexOf(':') === -1) {
      return new Literal(value, languageOrDatatype)
    }

    return new Literal(value, null, DataFactory.namedNode(languageOrDatatype))
  }

  return new Literal(value, null, languageOrDatatype)
}

function variable (value) {
  return new Variable(value)
}

function defaultGraph () {
  return DataFactory.defaultGraphInstance
}

function triple (subject, predicate, object) {
  return DataFactory.quad(subject, predicate, object)
}

function quad (subject, predicate, object, graph) {
  return new Quad(subject, predicate, object, graph || DataFactory.defaultGraphInstance)
}

function fromTerm (original) {
  return fromTermRaw.call(DataFactory, original)
}

function fromQuad (original) {
  return fromTermRaw.call(DataFactory, original)
}

const DataFactory = {
  namedNode,
  blankNode,
  literal,
  variable,
  defaultGraph,
  triple,
  quad,
  fromTerm,
  fromQuad,
  defaultGraphInstance: new DefaultGraph()
}

module.exports = DataFactory
