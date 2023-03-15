import object from '@mailobj-browser/front/js/utils/object.js'

const screenSizes = object(null, {
  xxs: 1,
  xs: 2,
  sm: 3,
  md: 4,
  lg: 5,
  xl: 6
})

export const isLowerThan = async (element, key) => {
  const {ownerDocument} = element
  const {documentElement} = ownerDocument
  return screenSizes[key] > screenSizes[getComputedStyle(documentElement).getPropertyValue('--ea_breakpoint')]
}

export const isGreaterThan = async (element, key) => {
  const {ownerDocument} = element
  const {documentElement} = ownerDocument
  return screenSizes[key] < screenSizes[getComputedStyle(documentElement).getPropertyValue('--ea_breakpoint')]
}