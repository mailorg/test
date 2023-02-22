import object from '@mailobj-browser/front/js/utils/object.js'
import { rect } from '../../fixed/fixed.js'
import * as menu from './menu.js'
import { display, opener } from './menu.js'
import all from '@mailobj-browser/front/js/selectors/all.js'

export const {
  close,
  focus,
  open
} = menu

const calc = (list, current) => {
  const coords = rect(current)
  const { height, width } = coords
  const x = Math.floor(Math.floor(height) / 2)
  const y = Math.floor(Math.floor(width) / 2)
  
  return { ...coords, current, x, y }
}

const next = (list, x, y) => {
  console.log({ list })
  for (const li of all(':not([aria-hidden="true"]) > [class$="_item"]', list)) {
    const { bottom, left, right, top } = rect(li)
    
    if (x >= left && x <= right && y >= top && y <= bottom) {
      return li
    }
  }
}

export const keys = object(null, {
  ArrowDown: async (list, current) => {
    const { left, bottom, x, y } = calc(list, current)
    
    return next(list, left + x, bottom + y)
  },
  ArrowLeft: async (list, current) => {
    const { left, top, x, y } = calc(list, current)
    
    return next(list, left - x, top + y)
  },
  ArrowRight: async (list, current) => {
    const { right, top, x, y } = calc(list, current)
    
    return next(list, right + x, top + y)
  },
  ArrowUp: async (list, current) => {
    const { left, top, x, y } = calc(list, current)
    
    return next(list, left + x, top - y)
  }
})

const onKeyDown = object(menu.onKeyDown, {
  keys
})

export default async (
  list
) => {
  onKeyDown.listen(list)
  display(list, opener(list))
}
