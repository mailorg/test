import object from '@mailobj-browser/front/js/utils/object.js'

export const isLowerThan = (element, key) => {
  const {ownerDocument} = element
  return key === getComputedStyle(ownerDocument).getPropertyValue('--ea_breakpoint')
}

export const isGreaterThan = (element, key) => {
  const {ownerDocument} = element
  return key === getComputedStyle(ownerDocument).getPropertyValue('--ea_breakpoint')
}