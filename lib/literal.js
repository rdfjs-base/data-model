'use strict'

const NamedNode = require('./named-node')

class Literal {
  constructor (value, language, datatype) {
    this.termType = Literal.termType
    this.value = value
    this.language = language || ''

    if (this.language) {
      this.datatype = Literal.langStringDatatype
    } else {
      this.datatype = datatype || Literal.stringDatatype
    }
  }

  equals (other) {
    return other.termType === this.termType && other.value === this.value &&
      other.language === this.language && other.datatype.equals(this.datatype)
  }

  toCanonical () {
    return '"' + this.value + '"'
    // TODO: escape special chars
    // TODO: language + datatype support
  }
}

Literal.termType = 'Literal'
Literal.langStringDatatype = new NamedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#langString')
Literal.stringDatatype = new NamedNode('http://www.w3.org/2001/XMLSchema#string')

module.exports = Literal
