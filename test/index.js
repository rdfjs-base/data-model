function runTests (rdf) {
  require('./named-node.test.js')(rdf)
  require('./blank-node.test.js')(rdf)
  require('./fromQuad.test.js')(rdf)
  require('./fromTerm.test.js')(rdf)
  require('./literal.test.js')(rdf)
  require('./default-graph.test.js')(rdf)
  require('./variable.test.js')(rdf)
  require('./quad.test.js')(rdf)
}

if (global.rdf) {
  runTests(global.rdf)
}

module.exports = runTests
