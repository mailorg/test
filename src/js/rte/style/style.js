import contract from '@mailobj-browser/front/js/contracts/contract.js'
import array from '@mailobj-browser/front/js/utils/array.js'
import bold from './bold.js'
import fontColor from './fontColor.js'
import highlightColor from './highlightColor.js'
import italic from './italic.js'
import strikethrough from './strikethrough.js'
import subscript from './subscript.js'
import superscript from './superscript.js'
import underline from './underline.js'
import formatBlock from './formatBlock.js'
import fontName from './fontName.js'
import fontSize from './fontSize.js'

export default contract({
  bold: array([
    bold
  ]),
  fontColor: array([
    fontColor
  ]),
  fontName: array([
    fontName
  ]),
  fontSize: array([
    fontSize
  ]),
  formatBlock: array([
    formatBlock
  ]),
  highlightColor: array([
    highlightColor
  ]),
  italic: array([
    italic
  ]),
  strikethrough: array([
    strikethrough
  ]),
  subscript: array([
    subscript
  ]),
  superscript: array([
    superscript
  ]),
  underline: array([
    underline
  ])
})
