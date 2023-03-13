import object from '@mailobj-browser/front/js/utils/object.js'

const {documentElement} = document
const {ownerDocument} = documentElement
const {style} = ownerDocument
console.log(documentElement)
const screenSizes = object(null, {
  xxs: 0,
  xs: 360,
  sm: 576,
  md: style.getProperty('--ea_breakpoint_md'),
  lg: 992,
  xl: 1200
})

export const device = object(null, {
  isLowerThanMd: () => {
    const width = window.innerWidth
    return width <= screenSizes.md
  },
  isGreaterThanMd: () => {
    const width = window.innerWidth
    return width > screenSizes.md
  },
})