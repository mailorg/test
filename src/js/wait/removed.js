import resolvable from '@mailobj-browser/front/js/utils/resolvable.js'
import never from '@mailobj-browser/front/js/utils/never.js'

const observers = new WeakMap()
const resolvers = new WeakMap()
const nodes = new Set()

const options = {
  childList: true,
  subtree: true
}

const find = removedNode => {
  if (nodes.has(removedNode)) {
    return removedNode
  }
  
  for (const node of nodes) {
    if (removedNode?.contains(node)) {
      return node
    }
  }
}

const callback = records => {
  for (const { removedNodes } of records) {
    for (const removedNode of removedNodes) {
      const node = find(removedNode)
      
      if (node) {
        for (const resolve of resolvers.get(node)) {
          resolve(node)
        }
  
        nodes.delete(node)
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
  
  if (!nodes.has(node)) {
    nodes.add(node)
    resolvers.set(node, [])
  }
  
  resolvers.get(node).push(resolve)
  
  return Promise.race([abort, promise])
}
