function fromTerm (original) {
  if (!original) {
    return null
  }

  if (original.termType === 'BlankNode') {
    return this.blankNode(original.value)
  }

  if (original.termType === 'DefaultGraph') {
    return this.defaultGraph()
  }

  if (original.termType === 'Literal') {
    return this.literal(original.value, original.language || this.namedNode(original.datatype.value))
  }

  if (original.termType === 'NamedNode') {
    return this.namedNode(original.value)
  }

  if (original.termType === 'Quad') {
    const subject = this.fromTerm(original.subject)
    const predicate = this.fromTerm(original.predicate)
    const object = this.fromTerm(original.object)
    const graph = this.fromTerm(original.graph)

    return this.quad(subject, predicate, object, graph)
  }

  if (original.termType === 'Variable') {
    return this.variable(original.value)
  }

  throw new Error(`unknown termType ${original.termType}`)
}

module.exports = fromTerm
