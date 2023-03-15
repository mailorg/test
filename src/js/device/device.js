import object from '@mailobj-browser/front/js/utils/object.js'

const screenSizes = object(null, {
  xxs: 1,
  xs: 2,
  sm: 3,
  md: 4,
  lg: 5,
  xl: 6
})

export const isLowerThan = (element, key) => {
  const {ownerDocument} = element
  console.log(ownerDocument);
  return screenSizes[key] > screenSizes[getComputedStyle(ownerDocument).getPropertyValue('--ea_breakpoint')]
}

export const isGreaterThan = (element, key) => {
  const {ownerDocument} = element
  return screenSizes[key] < screenSizes[getComputedStyle(ownerDocument).getPropertyValue('--ea_breakpoint')]
}