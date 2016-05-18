'use strict'

class NamedNode {
  constructor (iri) {
    this.termType = NamedNode.termType
    this.value = iri
  }

  equals (other) {
    return other.termType === this.termType && other.value === this.value
  }

  toCanonical () {
    return '<' + this.value + '>' // TODO: escape special chars
  }
}

NamedNode.termType = 'NamedNode'

module.exports = NamedNode
