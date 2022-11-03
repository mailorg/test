const containers = new WeakMap()

export const container = (
  template
) => {
  return containers.get(template)
}

export const listen = (
  template,
  container,
  listener
) => {
  const { parentNode } = template
  
  containers.set(template, container)
  listener.listen(parentNode)
}
