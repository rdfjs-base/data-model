'use strict'

var DefaultGraph = require('./default-graph')

function Quad (subject, predicate, object, graph) {
  this.subject = subject
  this.predicate = predicate
  this.object = object

  if (graph) {
    this.graph = graph
  }
}

Quad.prototype.equals = function (other) {
  return other.subject.equals(this.subject) && other.predicate.equals(this.predicate) &&
    other.object.equals(this.object) && other.graph.equals(this.graph)
}

Quad.prototype.toCanonical = function () {
  var graphString = this.graph.toCanonical()

  return this.subject.toCanonical() + ' ' + this.predicate.toCanonical() + ' ' + this.object.toCanonical() +
    (graphString ? (' ' + graphString) : '') + ' .'
}

Quad.prototype.graph = new DefaultGraph()

module.exports = Quad
