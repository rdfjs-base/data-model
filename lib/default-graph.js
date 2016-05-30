'use strict'

function DefaultGraph () {
  this.termType = DefaultGraph.termType
  this.value = ''
}

DefaultGraph.prototype.equals = function (other) {
  return other.termType === this.termType && other.value === this.value
}

DefaultGraph.prototype.toCanonical = function () {
  return ''
}

DefaultGraph.termType = 'DefaultGraph'

module.exports = DefaultGraph
