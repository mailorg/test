import object from '@mailobj-browser/front/js/utils/object.js'

export const sizes = object(null, {
  xxs: 1,
  xs: 2,
  sm: 3,
  md: 4,
  lg: 5,
  xl: 6
})

const map = new Map(Object.entries(sizes).map(([key, value]) => [value, key]))

const size = node => {
  const { ownerDocument = node } = node
  const { documentElement, defaultView } = ownerDocument
  const { getComputedStyle } = defaultView

  console.log(getComputedStyle(documentElement).getPropertyValue('--ea_breakpoint').trim());
  console.log(sizes[getComputedStyle(documentElement).getPropertyValue('--ea_breakpoint').trim()]);
  return sizes[getComputedStyle(documentElement).getPropertyValue('--ea_breakpoint').trim()]
}

export const isGreaterThan = (node, value) => map.get(value) < size(node)
export const isLowerThan = (node, value) => map.get(value) > size(node)