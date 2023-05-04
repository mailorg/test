import resolvable from '@mailobj-browser/front/js/utils/resolvable.js'
import never from '@mailobj-browser/front/js/utils/never.js'

const observers = new WeakMap()
const resolvers = new WeakMap()

const options = {
  childList: true,
  subtree: true
}

const callback = records => {
  for (const { removedNodes } of records) {
    for (const node of removedNodes) {
      if (resolvers.has(node)) {
        console.log({ node })
        for (const resolve of resolvers.get(node)) {
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
  const { ownerDocument } = node
  const { documentElement } = ownerDocument
  const [promise, { resolve }] = resolvable()
  const observer = observing(ownerDocument)
  
  observer.observe(documentElement, options)
  
  if (!resolvers.has(node)) {
    resolvers.set(node, [])
  }
  
  resolvers.get(node).push(resolve)
  
  return Promise.race([abort, promise])
}
