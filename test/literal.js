const { strictEqual } = require('assert')
const { describe, it } = require('mocha')

function runTests (DataFactory) {
  describe('.literal', function () {
    it('should be a static method', function () {
      strictEqual(typeof DataFactory.literal, 'function')
    })

    it('should create an object with a termType property that contains the value "Literal"', function () {
      const term = DataFactory.literal()

      strictEqual(term.termType, 'Literal')
    })

    it('should create an object with a value property that contains the given string', function () {
      const string = 'example'
      const term = DataFactory.literal(string)

      strictEqual(term.value, string)
    })

    it('should create an object with a language property that contains an empty string', function () {
      const string = 'example'
      const term = DataFactory.literal(string)

      strictEqual(term.language, '')
    })

    it('should create an object with a language property that contains the given language string', function () {
      const string = 'example'
      const language = 'en'
      const term = DataFactory.literal(string, language)

      strictEqual(term.language, language)
    })

    it('should create an object with a datatype property that contains a NamedNode with the value "http://www.w3.org/2001/XMLSchema#string"', function () {
      const string = 'example'
      const term = DataFactory.literal(string)

      strictEqual(term.datatype.termType, 'NamedNode')
      strictEqual(term.datatype.value, 'http://www.w3.org/2001/XMLSchema#string')
    })

    it('should create an object with a datatype property that contains a NamedNode with the value "http://www.w3.org/1999/02/22-rdf-syntax-ns#langString"', function () {
      const string = 'example'
      const language = 'en'
      const term = DataFactory.literal(string, language)

      strictEqual(term.datatype.termType, 'NamedNode')
      strictEqual(term.datatype.value, 'http://www.w3.org/1999/02/22-rdf-syntax-ns#langString')
    })

    it('should create an object with a datatype property that contains a NamedNode with the given IRI', function () {
      const string = 'example'
      const datatype = DataFactory.namedNode('http://example.org')
      const term = DataFactory.literal(string, datatype)

      strictEqual(term.datatype.termType, 'NamedNode')
      strictEqual(term.datatype.value, datatype.value)
    })

    describe('.equals', function () {
      it('should be a method', function () {
        const term = DataFactory.literal('')

        strictEqual(typeof term.equals, 'function')
      })

      it('should return true if termType, value, language and datatype are equal', function () {
        const string = 'example'
        const language = 'en'
        const term = DataFactory.literal(string, language)
        const mock = {
          termType: 'Literal',
          value: string,
          language: language,
          datatype: DataFactory.namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#langString')
        }

        strictEqual(term.equals(mock), true)
      })

      it('should return false if termType is not equal', function () {
        const string = 'example'
        const language = 'en'
        const term = DataFactory.literal(string, language)
        const mock = {
          termType: 'NamedNode',
          value: string,
          language: language,
          datatype: DataFactory.namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#langString')
        }

        strictEqual(term.equals(mock), false)
      })

      it('should return false if value is not equal', function () {
        const string = 'example'
        const language = 'en'
        const term = DataFactory.literal(string, language)
        const mock = {
          termType: 'Literal',
          value: string + '1',
          language: language,
          datatype: DataFactory.namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#langString')
        }

        strictEqual(term.equals(mock), false)
      })

      it('should return false if language is not equal', function () {
        const string = 'example'
        const language = 'en'
        const term = DataFactory.literal(string, language)
        const mock = {
          termType: 'Literal',
          value: string,
          language: 'de',
          datatype: DataFactory.namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#langString')
        }

        strictEqual(term.equals(mock), false)
      })

      it('should return false if datatype is not equal', function () {
        const string = 'example'
        const language = 'en'
        const term = DataFactory.literal(string, language)
        const mock = {
          termType: 'Literal',
          value: string,
          language: language,
          datatype: DataFactory.namedNode('http://example.org')
        }

        strictEqual(term.equals(mock), false)
      })

      it('should return false if value is falsy', function () {
        const string = 'example'
        const language = 'en'
        const term = DataFactory.literal(string, language)

        strictEqual(term.equals(null), false)
      })
    })
  })
}

module.exports = runTests
