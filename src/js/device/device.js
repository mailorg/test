import object from '@mailobj-browser/front/js/utils/object.js'

export const sizes = object(null, {
  xxs: 1,
  xs: 2,
  sm: 3,
  md: 4,
  lg: 5,
  xl: 6
})

const map = new Map(Object.entries(sizes).map(([key, value]) => [value, key]))

const size = node => {
  const { ownerDocument } = node
  const { documentElement, defaultView } = ownerDocument ?? node
  const { getComputedStyle } = defaultView

  return sizes[getComputedStyle(documentElement).getPropertyValue('--ea_breakpoint').trim()]
}

export const isGreaterThan = (node, value) => sizes[map.get(value)] < size(node)
export const isLowerThan = (node, value) => sizes[map.get(value)] > size(node)

export const isMobile = (node) => {
  if (/(android|iphone|ipad|mobile)/i.test(navigator.userAgent.toLowerCase())) {

    return true
  }
}