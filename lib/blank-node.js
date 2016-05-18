'use strict'

class BlankNode {
  constructor (id) {
    this.termType = BlankNode.termType
    this.value = id || ('b' + (++BlankNode.nextId))
  }

  equals (other) {
    return other.termType === this.termType && other.value === this.value
  }

  toCanonical () {
    return '_:' + this.value // TODO: escape special chars
  }
}

BlankNode.termType = 'BlankNode'
BlankNode.nextId = 0

module.exports = BlankNode
