import contract from '@mailobj-js/front/js/contracts/contract.js'
import array from '@mailobj-js/front/js/utils/array.js'
import center from './center.js'
import indent from './indent.js'
import justify from './justify.js'
import left from './left.js'
import outdent from './outdent.js'
import right from './right.js'

export default contract({
  center: array([
    center
  ]),
  indent: array([
    indent
  ]),
  justify: array([
    justify
  ]),
  left: array([
    left
  ]),
  outdent: array([
    outdent
  ]),
  right: array([
    right
  ])
})

