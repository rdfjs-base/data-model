'use strict'

function BlankNode (id) {
  this.value = id || ('b' + (++BlankNode.nextId))
}

BlankNode.prototype.equals = function (other) {
  return other.termType === this.termType && other.value === this.value
}

BlankNode.prototype.toCanonical = function () {
  return '_:' + this.value // TODO: escape special chars
}

BlankNode.prototype.termType = 'BlankNode'

BlankNode.nextId = 0

module.exports = BlankNode
