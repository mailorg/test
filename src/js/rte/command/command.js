import contract from '@mailobj-browser/front/js/contracts/contract.js'
import array from '@mailobj-browser/front/js/utils/array.js'
import clear from './clear.js'
import formatBlock from './formatBlock.js'
import hr from './hr.js'
import ol from './ol.js'
import redo from './redo.js'
import ul from './ul.js'
import undo from './undo.js'
import removeFormat from './removeFormat.js'

export default contract ({
  clear: array([
    clear
  ]),
  formatBlock: array([
    formatBlock
  ]),
  hr: array([
    hr
  ]),
  ol: array([
    ol
  ]),
  redo: array([
    redo
  ]),
  removeFormat: array([
    removeFormat
  ]),
  ul: array([
    ul
  ]),
  undo: array([
    undo
  ]),
})
