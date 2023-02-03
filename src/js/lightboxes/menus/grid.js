import object from '@mailobj-browser/front/js/utils/object.js'
import { rect } from '../../fixed/fixed.js'
import * as menu from './menu.js'

export const {
  close,
  focus,
  open
} = menu

const calc = (list, event) => {
  const { target } = event
  const current = target.closest('li')
  const coords = rect(current)
  const { height, width } = coords
  const x = height / 2
  const y = width / 2
  
  return { ...coords, current, x, y }
}

const next = ({ children }, x, y) => {
  for (const li of children) {
    const { bottom, left, right, top } = rect(li)
    
    if (x >= left && x <= right && y >= top && y <= bottom) {
      return li
    }
  }
}

const keys = object(null, {
  ArrowDown: (list, current, event) => {
    const { left, bottom, x, y } = calc(list, current, event)
    
    return next(list, left + x, bottom + y) ??
      current.nextElementSibling ??
      list.firstElementChild
  },
  ArrowLeft: (list, current, event) => {
    const { left, top, x, y } = calc(list, current, event)
    
    return next(list, left - x, top + y) ??
      current.previousElementSibling ??
      list.lastElementChild
  },
  ArrowRight: (list, current, event) => {
    const { right, top, x, y } = calc(list, current, event)
    
    return next(list, right + x, top + y) ??
      current.nextElementSibling ??
      list.firstElementChild
  },
  ArrowUp: (list, current, event) => {
    const { left, top, x, y } = calc(list, current, event)
    
    return next(list, left + x, top - y) ??
      current.previousElementSibling ??
      list.lastElementChild
  }
})

const onKeyDown = object(menu.onKeyDown, {
  keys
})

export default async (
  list
) => {
  console.log('grid')
  onKeyDown.listen(list)
  menu.focus(list)
}
