'use strict'
import namedNodeTest from './named-node'
import blankNodeTest from './blank-node'
import literalTest from './literal'
import defaultGraphTest from './default-graph'
import variableTest from './variable'
import tripleTest from './triple'
import quadTest from './quad'

function runTests (DataFactory) {
  namedNodeTest(DataFactory)
  blankNodeTest(DataFactory)
  literalTest(DataFactory)
  defaultGraphTest(DataFactory)
  variableTest(DataFactory)
  tripleTest(DataFactory)
  quadTest(DataFactory)
}

export default runTests
