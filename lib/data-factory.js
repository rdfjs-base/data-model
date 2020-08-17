var BlankNode = require('./blank-node')
var DefaultGraph = require('./default-graph')
var Literal = require('./literal')
var NamedNode = require('./named-node')
var Quad = require('./quad')
var Variable = require('./variable')

function namedNode (value) {
  return new NamedNode(value)
}

const defaultGraphInstance = new DefaultGraph()

function blankNode (value) {
  return new BlankNode(value)
}

function literal (value, languageOrDatatype) {
  if (typeof languageOrDatatype === 'string') {
    if (languageOrDatatype.indexOf(':') === -1) {
      return new Literal(value, languageOrDatatype)
    }

    return new Literal(value, null, namedNode(languageOrDatatype))
  }

  return new Literal(value, null, languageOrDatatype)
}

function defaultGraph () {
  return defaultGraphInstance
}

function variable (value) {
  return new Variable(value)
}

function quad (subject, predicate, object, graph) {
  return new Quad(subject, predicate, object, graph || defaultGraphInstance)
}

function triple (subject, predicate, object) {
  return quad(subject, predicate, object)
}

module.exports = {
  namedNode,
  blankNode,
  literal,
  defaultGraph,
  defaultGraphInstance,
  variable,
  quad,
  triple
}
