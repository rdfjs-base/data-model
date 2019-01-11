function DefaultGraph () {
  this.value = ''
}

DefaultGraph.prototype.equals = function (other) {
  return other.termType === this.termType
}

DefaultGraph.prototype.termType = 'DefaultGraph'

module.exports = DefaultGraph
