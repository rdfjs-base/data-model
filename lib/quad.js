var DefaultGraph = require('./default-graph')

function Quad (subject, predicate, object, graph) {
  this.subject = subject
  this.predicate = predicate
  this.object = object

  if (graph) {
    this.graph = graph
  } else {
    this.graph = new DefaultGraph()
  }
}

Quad.prototype.equals = function (other) {
  // `|| !other.termType` is for backwards-compatibility with old factories without RDF* support.
  return !!other && (other.termType === 'Quad' || !other.termType) &&
    other.subject.equals(this.subject) && other.predicate.equals(this.predicate) &&
    other.object.equals(this.object) && other.graph.equals(this.graph)
}

Quad.prototype.termType = 'Quad'
Quad.prototype.value = ''

module.exports = Quad
