import contract from '@mailobj-browser/front/js/contracts/contract.js'
import array from '@mailobj-browser/front/js/utils/array.js'
import clear from './clear.js'
import hr from './hr.js'

export default contract ({
  clear: array([
    clear
  ]),
  hr: array([
    hr
  ]),
})
