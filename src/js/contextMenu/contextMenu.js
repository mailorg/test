const wrappers = new WeakSet()
const targets = new WeakMap()

export default wrapper => {
  wrappers.add(wrapper)
}

export const set = (wrapper, target) => {
  if (wrappers.has(wrapper)) {
    targets.set(wrapper, target)
  }
}

export const get = wrapper => {
  return targets.get(wrapper)
}

