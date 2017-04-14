'use strict'

var NamedNode = require('./named-node')

function Literal (value, language, datatype) {
  this.value = value

  if (language) {
    this.language = language
    this.datatype = Literal.langStringDatatype
  } else if (datatype) {
    this.datatype = datatype
  }
}

Literal.prototype.equals = function (other) {
  return other.termType === this.termType && other.value === this.value &&
    other.language === this.language && other.datatype.equals(this.datatype)
}

Literal.prototype.termType = 'Literal'
Literal.prototype.language = ''
Literal.prototype.datatype = new NamedNode('http://www.w3.org/2001/XMLSchema#string')

Literal.langStringDatatype = new NamedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#langString')

module.exports = Literal
