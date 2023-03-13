import object from '@mailobj-browser/front/js/utils/object.js'
import { md } from '@mailobj-browser/components-generics/scss/abstracts/_variables.scss'

export const device = object(null, {
  isLowerThanMd: () => {
    const width = window.innerWidth
    return width <= md
  },
  isGreaterThanMd: () => {
    const width = window.innerWidth
    return width > md
  },
})