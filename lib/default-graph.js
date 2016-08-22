'use strict'

function DefaultGraph () {
  this.value = ''
}

DefaultGraph.prototype.equals = function (other) {
  return other.termType === this.termType && other.value === this.value
}

DefaultGraph.prototype.toCanonical = function () {
  return ''
}

DefaultGraph.prototype.termType = 'DefaultGraph'

module.exports = DefaultGraph
