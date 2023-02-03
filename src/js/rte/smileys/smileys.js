import contract from '@mailobj-browser/front/js/contracts/contract.js'
import array from '@mailobj-browser/front/js/utils/array.js'
import insertSmiley from './insert.js'

export default contract({
  insert: array([
    insertSmiley
  ])
})

