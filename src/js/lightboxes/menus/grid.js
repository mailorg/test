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

export const calc = (current) => {
  const coords = rect(current)
  const { height, width } = coords
  const x = Math.floor(Math.floor(height) / 2)
  const y = Math.floor(Math.floor(width) / 2)
  
  return { ...coords, current, x, y }
}

export const item = (parentNode, x, y) => {
  const items = all('[class$="_item"]', parentNode)
  
  for (const item of items) {
    const { bottom, left, right, top } = rect(item)
    
    if (x >= left && x <= right && y >= top && y <= bottom) {
      return item
    }
  }
}

export const keys = object(null, {
  ArrowDown: async (list, current) => {
    const { parentNode } = current
    const { left, bottom, x, y } = calc(current)
    
    return item(parentNode, left + x, bottom + y)
  },
  ArrowLeft: async (list, current) => {
    const { parentNode } = current
    const { left, top, x, y } = calc(current)
    
    return item(parentNode, left - x, top + y)
  },
  ArrowRight: async (list, current) => {
    const { parentNode } = current
    const { right, top, x, y } = calc(current)
    
    return item(parentNode, right + x, top + y)
  },
  ArrowUp: async (list, current) => {
    const { parentNode } = current
    const { left, top, x, y } = calc(current)
    
    return item(parentNode, left + x, top - y)
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
