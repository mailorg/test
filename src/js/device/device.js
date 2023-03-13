import object from '@mailobj-browser/front/js/utils/object.js'

const {documentElement} = document
console.log(getComputedStyle(documentElement).getPropertyValue('--ea_breakpoint_md'));
const screenSizes = object(null, {
  xxs: getComputedStyle(documentElement).getPropertyValue('--ea_breakpoint_xxs'),
  xs: getComputedStyle(documentElement).getPropertyValue('--ea_breakpoint_xs'),
  sm: getComputedStyle(documentElement).getPropertyValue('--ea_breakpoint_sm'),
  md: getComputedStyle(documentElement).getPropertyValue('--ea_breakpoint_md'),
  lg: getComputedStyle(documentElement).getPropertyValue('--ea_breakpoint_lg'),
  xl: getComputedStyle(documentElement).getPropertyValue('--ea_breakpoint_xl')
})

export const device = object(null, {
  isLowerThanMd: () => {
    console.log(screenSizes.md)
    const width = window.innerWidth
    return width <= screenSizes.md
  },
  isGreaterThanMd: () => {
    const width = window.innerWidth
    return width > screenSizes.md
  },
})