import object from '@mailobj-browser/front/js/utils/object.js'

const screenSizes = object(null, {
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
  return screenSizes[key] > screenSizes[defaultView.getComputedStyle(documentElement).getPropertyValue('--ea_breakpoint')]
}

export const isGreaterThan = async (node, key) => {
  const {ownerDocument = node} = node
  const {documentElement, defaultView} = ownerDocument
  return screenSizes[key] < screenSizes[defaultView.getComputedStyle(documentElement).getPropertyValue('--ea_breakpoint')]
}