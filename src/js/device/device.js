import object from '@mailobj-browser/front/js/utils/object.js'

export const sizes = object(null, {
  xxs: 1,
  xs: 2,
  sm: 3,
  md: 4,
  lg: 5,
  xl: 6
})

export const isLowerThan = async (node, key) => {
  const {ownerDocument = node} = node
  const {documentElement, defaultView} = ownerDocument
  const {getComputedStyle} = defaultView
  const map = new Map(Object.entries(sizes).map(([key, value]) => [value, key]))
  console.log(map);
  return key > sizes[getComputedStyle(documentElement).getPropertyValue('--ea_breakpoint')]
}

export const isGreaterThan = async (node, key) => {
  const {ownerDocument = node} = node
  const {documentElement, defaultView} = ownerDocument
  const {getComputedStyle} = defaultView
  return key < sizes[getComputedStyle(documentElement).getPropertyValue('--ea_breakpoint')]
}