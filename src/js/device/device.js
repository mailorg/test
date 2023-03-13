import object from '@mailobj-browser/front/js/utils/object.js'
// import { md } from '@mailobj-browser/components-generics/scss/abstracts/_variables.scss'

const screenSizes = object(null, {
  xxs: 0,
  xs: 360,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200
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