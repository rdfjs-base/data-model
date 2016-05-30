'use strict'

function Variable (name) {
  this.termType = Variable.termType
  this.value = name
}

Variable.prototype.equals = function (other) {
  return other.termType === this.termType && other.value === this.value
}

Variable.prototype.toCanonical = function () {
  return '?' + this.value // TODO: escape special chars
}

Variable.termType = 'Variable'

module.exports = Variable
