import matchingOrClosest from '@mailobj-js/front/js/selectors/matchingOrClosest.js'
import object from '@mailobj-js/front/js/utils/object.js'
import listener from '@mailobj-js/front/js/events/listeners/listener.js'
import passive from '@mailobj-js/front/js/events/options/passive.js'
import one from '@mailobj-js/front/js/selectors/one.js'
import selectionChange from '@mailobj-js/front/js/events/types/selectionChange.js'

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
  const rte = matchingOrClosest(selector, commonAncestorContainer)
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

const onSelectionChange = object(listener, {
  type: selectionChange,
  passive,
  async task (
    document
  ) {
    const [rte, texts] = selection(document)
    
    for (const [button, { test }] of tasks.get(rte)) {
      for (const text of texts) {
        if (test(text)) {
          button.classList.add(modifier)
        } else {
          button.classList.remove(modifier)
        }
      }
    }
  }
})

export default (
  button,
  { test }
) => {
  const form = button.closest('form')
  console.log({ button, form })
  const { contentWindow } = one('iframe', form)
  const { document } = contentWindow
  const rte = one(selector, document)
  
  if (!tasks.has(rte)) {
    tasks.set(rte, new Map())
  }
  
  tasks.get(rte).set(button, { test })
  onSelectionChange.listen(document)
}
