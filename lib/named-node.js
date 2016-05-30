'use strict'

function NamedNode (iri) {
  this.termType = NamedNode.termType
  this.value = iri
}

NamedNode.prototype.equals = function (other) {
  return other.termType === this.termType && other.value === this.value
}

NamedNode.prototype.toCanonical = function () {
  return '<' + this.value + '>' // TODO: escape special chars
}

NamedNode.termType = 'NamedNode'

module.exports = NamedNode
