import contract from '@mailobj-browser/front/js/contracts/contract.js'
import array from '@mailobj-browser/front/js/utils/array.js'
import clear from './clear.js'
import hr from './hr.js'
import ol from './ol.js'
import redo from './redo.js'
import ul from './ul.js'
import undo from './undo.js'
import removeFormat from './removeFormat.js'
import signature from './signature.js'

export default contract ({
  clear: array([
    clear
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
  signature: array([
    signature
  ]),
  ul: array([
    ul
  ]),
  undo: array([
    undo
  ]),
})
