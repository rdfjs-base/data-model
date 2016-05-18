'use strict'

class DefaultGraph {
  constructor () {
    this.termType = DefaultGraph.termType
    this.value = ''
  }

  equals (other) {
    return other.termType === this.termType && other.value === this.value
  }

  toCanonical () {
    return ''
  }
}

DefaultGraph.termType = 'DefaultGraph'

module.exports = DefaultGraph
