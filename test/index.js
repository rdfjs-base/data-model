'use strict'
import { namedNodeTests } from './named-node'
import { blankNodeTests } from './blank-node'
import { literalTests } from './literal'
import { defaultGraphTests } from './default-graph'
import { variableTests } from './variable'
import { tripleTests } from './triple'
import { quadTests } from './quad'

export function runTests (DataFactory) {
  namedNodeTests(DataFactory)
  blankNodeTests(DataFactory)
  literalTests(DataFactory)
  defaultGraphTests(DataFactory)
  variableTests(DataFactory)
  tripleTests(DataFactory)
  quadTests(DataFactory)
}
