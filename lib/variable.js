'use strict'

function Variable (name) {
  this.value = name
}

Variable.prototype.equals = function (other) {
  return other.termType === this.termType && other.value === this.value
}

Variable.prototype.termType = 'Variable'

module.exports = Variable
