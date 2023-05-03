import resolvable from '@mailobj-browser/front/js/utils/resolvable.js'
import never from '@mailobj-browser/front/js/utils/never.js'

const observers = new WeakMap()
const resolvers = new WeakMap()

const options = {
  childList: true
}

const callback = (records, observer) => {
  for (const { removedNodes } of records) {
    for (const node of removedNodes) {
      if (observers.get(node.getRootNode()) !== observer) {
        for (const resolve of resolvers.get(node) ?? []) {
          resolve(node)
        }
        
        resolvers.delete(node)
      }
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

export default async (node, abort = never) => {
  const { ownerDocument, parentNode } = node
  const [promise, { resolve }] = resolvable()
  const observer = observing(ownerDocument)
  
  observer.observe(parentNode, options)
  
  if (!resolvers.has(node)) {
    resolvers.set(node, [])
  }
  
  resolvers.get(node).push(resolve)
  
  return Promise.race([abort, promise])
}
