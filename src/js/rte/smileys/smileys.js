import contract from '@mailobj-browser/front/js/contracts/contract.js'
import array from '@mailobj-browser/front/js/utils/array.js'
import display from './display.js'
import next from './next.js'
import previous from './previous.js'

export default contract({
  display: array([
    display
  ]),
  next: array([
    next
  ]),
  previous: array([
    previous
  ])
})

