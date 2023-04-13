import resolvable from '@mailobj-browser/front/js/utils/resolvable.js'
import never from '@mailobj-browser/front/js/utils/never.js'

const observers = new WeakMap()
const resolvers = new WeakMap()

const options = {
  childList: true
}

const callback = records => {
  for (const { addedNodes } of records) {
    for (const node of addedNodes) {
      resolvers.get(node)?.(node)
    }
  }
}

const observing = ownerDocument => {
  if (!observers.has(ownerDocument)) {
    const { defaultView } = ownerDocument
    const { MutationObserver } = defaultView
    const observer = new MutationObserver(callback)
    
    observers.set(ownerDocument, observer)
  }
  
  return observers.get(ownerDocument)
}

export default (node, parentNode, abort = never) => {
  const { ownerDocument } = parentNode
  const [promise, { resolve }] = resolvable()
  const observer = observing(ownerDocument)
  
  observer.observe(parentNode, options)
  resolvers.set(node, resolve)
  
  return Promise.race([abort, promise])
}
