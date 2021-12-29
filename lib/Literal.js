class Literal {
  constructor (value, language, datatype) {
    this.value = value
    this.language = language
    this.datatype = datatype
  }

  equals (other) {
    return !!other &&
      other.termType === this.termType &&
      other.value === this.value &&
      other.language === this.language &&
      other.datatype.equals(this.datatype)
  }
}

Literal.prototype.termType = 'Literal'

export default Literal
