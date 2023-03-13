import object from '@mailobj-browser/front/js/utils/object.js'

const {documentElement} = document
console.log(getComputedStyle(documentElement).getPropertyValue('--ea_breakpoint_md'));
const screenSizes = object(null, {
  xxs: getComputedStyle(documentElement).getPropertyValue('--ea_breakpoint_xxs').slice(0, -3),
  xs: getComputedStyle(documentElement).getPropertyValue('--ea_breakpoint_xs').slice(0, -3),
  sm: getComputedStyle(documentElement).getPropertyValue('--ea_breakpoint_sm').slice(0, -3),
  md: getComputedStyle(documentElement).getPropertyValue('--ea_breakpoint_md').slice(0, -3),
  lg: getComputedStyle(documentElement).getPropertyValue('--ea_breakpoint_lg').slice(0, -3),
  xl: getComputedStyle(documentElement).getPropertyValue('--ea_breakpoint_xl').slice(0, -3)
})

export const device = object(null, {
  isLowerThanMd: () => {
    console.log(screenSizes)
    const width = window.innerWidth
    return width <= screenSizes.md
  },
  isGreaterThanMd: () => {
    const width = window.innerWidth
    return width > screenSizes.md
  },
})