'use strict'

class Variable {
  constructor (name) {
    this.termType = Variable.termType
    this.value = name
  }

  equals (other) {
    return other.termType === this.termType && other.value === this.value
  }

  toCanonical () {
    return '?' + this.value // TODO: escape special chars
  }
}

Variable.termType = 'Variable'

module.exports = Variable
