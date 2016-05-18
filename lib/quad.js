'use strict'

const DefaultGraph = require('./default-graph')

class Quad {
  constructor (subject, predicate, object, graph) {
    this.subject = subject
    this.predicate = predicate
    this.object = object
    this.graph = graph || Quad.defaultGraphInstance
  }

  equals (other) {
    return other.subject.equals(this.subject) && other.predicate.equals(this.predicate) &&
        other.object.equals(this.object) && other.graph.equals(this.graph)
  }

  toCanonical () {
    let graphString = this.graph.toCanonical()

    return this.subject.toCanonical() + ' ' + this.predicate.toCanonical() + ' ' + this.object.toCanonical() +
      (graphString ? (' ' + graphString) : '')
  }
}

Quad.defaultGraphInstance = new DefaultGraph()

module.exports = Quad
