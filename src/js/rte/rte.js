import object from '@mailobj-browser/front/js/utils/object.js'
import listener from '@mailobj-browser/front/js/events/listeners/listener.js'
import passive from '@mailobj-browser/front/js/events/options/passive.js'
import one from '@mailobj-browser/front/js/selectors/one.js'
import selectionChange from '@mailobj-browser/front/js/events/types/selectionChange.js'
import load from '@mailobj-browser/front/js/events/types/load.js'
import globals from '../ea/globals.js'

const params = new WeakMap()
const tasks = new WeakMap()

const expression = 'descendant-or-self::*/text()'
const modifier = 'utilities_rte-highlight'
const selector = 'body'

const texts = (
  document,
  container
) => {
  const { defaultView } = document
  const { XPathResult } = defaultView
  const type = XPathResult.ORDERED_NODE_ITERATOR_TYPE
  const nodes = document.evaluate(expression, container, null, type, null)
  const texts = []
  
  while (true) {
    const text = nodes.iterateNext()
    
    if (!text) {
      break
    }
    
    texts.push(text)
  }
  
  return texts
}

const selection = (
  document
) => {
  const selection = document.getSelection()
  const { commonAncestorContainer } = selection.getRangeAt(0)
  const rte = one(selector, document)
  const contents = []
  
  if (rte) {
    const { anchorNode, focusNode } = selection
    const nodes = texts(document, commonAncestorContainer)
    const start = nodes.indexOf(anchorNode)
    const end = nodes.indexOf(focusNode)
  
    if (selection.containsNode(anchorNode)) {
      contents.push(anchorNode)
    }
  
    contents.push(...nodes.slice(start, end))
  
    if (selection.containsNode(focusNode)) {
      contents.push(focusNode)
    }
  }
  
  return [
    rte,
    new Set(contents)
  ]
}

const onLoad = object(listener, {
  type: load,
  passive,
  task (
    iframe
  ) {
    const { button, test } = params.get(iframe)
    const { contentWindow } = iframe
    const { document } = contentWindow
    const rte = one(selector, document)
  
    if (!tasks.has(rte)) {
      tasks.set(rte, new Map())
    }
  
    tasks.get(rte).set(button, { test })
    onSelectionChange.listen(document)
  }
})

const onSelectionChange = object(listener, {
  type: selectionChange,
  passive,
  async task (
    document
  ) {
    const [rte, texts] = selection(document)
    
    for (const [button, { test }] of tasks.get(rte)) {
      button.classList.remove(modifier)
      
      for (const text of texts) {
        if (test(text)) {
          button.classList.add(modifier)
        }
      }
    }
  }
})

export const insert = (
  rte,
  text
) => {
  globals.ea_rte_exec_insert(rte, text)
}
export const command = (
  rte,
  command,
  options
) => {
  globals.ea_rte_command(rte, command, options)
}

export const command_clear = (
  rte,
) => {
  globals.ea_rte_command_clear(rte)
}

export default (
  button,
  { test }
) => {
  console.log(button);
  const form = button.closest('form')
  const iframe = one('iframe', form)

  params.set(iframe, object(null, { button, test }))
  onLoad.listen(iframe)
}
