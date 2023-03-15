import object from '@mailobj-browser/front/js/utils/object.js'

const screenSizes = object(null, {
  xxs: 1,
  xs: 2,
  sm: 3,
  md: 4,
  lg: 5,
  xl: 6
})

export const isLowerThan = (node, key) => {
  const {ownerDocument = node} = node
  const {documentElement, defaultView} = ownerDocument
  const {getComputedStyle} = defaultView
  return screenSizes[key] > screenSizes[getComputedStyle(documentElement).getPropertyValue('--ea_breakpoint')]
}

export const isGreaterThan = (node, key) => {
  const {ownerDocument = node} = node
  const {documentElement, defaultView} = ownerDocument
  const {getComputedStyle} = defaultView
  return screenSizes[key] < screenSizes[getComputedStyle(documentElement).getPropertyValue('--ea_breakpoint')]
}