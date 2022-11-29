import removed from '../../wait/removed.js'

const nodes = new WeakMap()

export const container = (
  parentNode
) => {
  const { container } = nodes.get(parentNode)
  
  return container
}

export const template = (
  parentNode
) => {
  const { template } = nodes.get(parentNode)
  
  return template
}

export const listen = (
  template,
  container,
  listener
) => {
  const { parentNode } = template
  console.log({ container, template })
  nodes.set(parentNode, { container, template })
  listener.listen(parentNode)
  
  queueMicrotask(async () => {
    await removed(parentNode)
    nodes.delete(parentNode)
  })
}
