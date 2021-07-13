(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.rdf = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
const DataFactory = require('./lib/DataFactory.js')

module.exports = DataFactory

},{"./lib/DataFactory.js":3}],2:[function(require,module,exports){
class BlankNode {
  constructor (id) {
    this.value = id || ('b' + (++BlankNode.nextId))
  }

  equals (other) {
    return !!other && other.termType === this.termType && other.value === this.value
  }
}

BlankNode.prototype.termType = 'BlankNode'

BlankNode.nextId = 0

module.exports = BlankNode

},{}],3:[function(require,module,exports){
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

},{"./BlankNode.js":2,"./DefaultGraph.js":4,"./Literal.js":5,"./NamedNode.js":6,"./Quad.js":7,"./Variable.js":8,"./fromTerm.js":9}],4:[function(require,module,exports){
class DefaultGraph {
  equals (other) {
    return !!other && other.termType === this.termType
  }
}

DefaultGraph.prototype.termType = 'DefaultGraph'
DefaultGraph.prototype.value = ''

module.exports = DefaultGraph

},{}],5:[function(require,module,exports){
const NamedNode = require('./NamedNode.js')

class Literal {
  constructor (value, language, datatype) {
    this.value = value
    this.datatype = Literal.stringDatatype
    this.language = ''

    if (language) {
      this.language = language
      this.datatype = Literal.langStringDatatype
    } else if (datatype) {
      this.datatype = datatype
    }
  }

  equals (other) {
    return !!other && other.termType === this.termType && other.value === this.value &&
      other.language === this.language && other.datatype.equals(this.datatype)
  }
}

Literal.prototype.termType = 'Literal'

Literal.langStringDatatype = new NamedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#langString')
Literal.stringDatatype = new NamedNode('http://www.w3.org/2001/XMLSchema#string')

module.exports = Literal

},{"./NamedNode.js":6}],6:[function(require,module,exports){
class NamedNode {
  constructor (iri) {
    this.value = iri
  }

  equals (other) {
    return !!other && other.termType === this.termType && other.value === this.value
  }
}

NamedNode.prototype.termType = 'NamedNode'

module.exports = NamedNode

},{}],7:[function(require,module,exports){
const DefaultGraph = require('./DefaultGraph.js')

class Quad {
  constructor (subject, predicate, object, graph) {
    this.subject = subject
    this.predicate = predicate
    this.object = object

    if (graph) {
      this.graph = graph
    } else {
      this.graph = new DefaultGraph()
    }
  }

  equals (other) {
    // `|| !other.termType` is for backwards-compatibility with old factories without RDF* support.
    return !!other && (other.termType === 'Quad' || !other.termType) &&
      other.subject.equals(this.subject) && other.predicate.equals(this.predicate) &&
      other.object.equals(this.object) && other.graph.equals(this.graph)
  }
}

Quad.prototype.termType = 'Quad'
Quad.prototype.value = ''

module.exports = Quad

},{"./DefaultGraph.js":4}],8:[function(require,module,exports){
class Variable {
  constructor (name) {
    this.value = name
  }

  equals (other) {
    return !!other && other.termType === this.termType && other.value === this.value
  }
}

Variable.prototype.termType = 'Variable'

module.exports = Variable

},{}],9:[function(require,module,exports){
function fromTerm (original) {
  if (!original) {
    return null
  }

  if (original.termType === 'BlankNode') {
    return this.blankNode(original.value)
  }

  if (original.termType === 'DefaultGraph') {
    return this.defaultGraph()
  }

  if (original.termType === 'Literal') {
    return this.literal(original.value, original.language || this.namedNode(original.datatype.value))
  }

  if (original.termType === 'NamedNode') {
    return this.namedNode(original.value)
  }

  if (original.termType === 'Quad') {
    const subject = this.fromTerm(original.subject)
    const predicate = this.fromTerm(original.predicate)
    const object = this.fromTerm(original.object)
    const graph = this.fromTerm(original.graph)

    return this.quad(subject, predicate, object, graph)
  }

  if (original.termType === 'Variable') {
    return this.variable(original.value)
  }

  throw new Error(`unknown termType ${original.termType}`)
}

module.exports = fromTerm

},{}]},{},[1])(1)
});
