import object from '@mailobj-browser/front/js/utils/object.js'

const {documentElement} = document
const {style} = documentElement
const screenSizes = object(null, {
  xxs: style.getPropertyValue('--ea_breakpoint_xxs'),
  xs: style.getPropertyValue('--ea_breakpoint_xs'),
  sm: style.getPropertyValue('--ea_breakpoint_sm'),
  md: style.getPropertyValue('--ea_breakpoint_md'),
  lg: style.getPropertyValue('--ea_breakpoint_lg'),
  xl: style.getPropertyValue('--ea_breakpoint_xl')
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