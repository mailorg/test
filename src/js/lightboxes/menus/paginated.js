import object from '@mailobj-browser/front/js/utils/object.js'
import * as menu from './menu.js'
import { display, opener } from './menu.js'
import * as grid from './grid.js'
import one from '@mailobj-browser/front/js/selectors/one.js'

const { ArrowDown, ArrowLeft, ArrowRight, ArrowUp } = grid.keys

export const {
  close,
  focus,
  open
} = menu

const keys = object(null, {
  ArrowDown: async (list, current) => {
    const { children } = list
    const [pages, pagination] = children
    
    if (pages.contains(current)) {
      const item = await ArrowDown(pages, current)
  
      if (item) {
        return item
      }
  
      const { left, bottom, x, y } = grid.calc(current)
  
      return grid.item(pagination, left + x, bottom + y)
    }
  },
  ArrowLeft: async (list, current) => {
    const page = one('ul > li:not([aria-hidden="true"])', list)
  
    if (page.contains(current)) {
      const item = await ArrowLeft(list, current)
    
      if (item) {
        return item
      }
    
      return
    }
    
    const { previousElementSibling } = current
    
    return previousElementSibling
  },
  ArrowRight: async (list, current) => {
    const page = one('ul > li:not([aria-hidden="true"])', list)
  
    if (page.contains(current)) {
      const item = await ArrowRight(list, current)
    
      if (item) {
        return item
      }
    
      return
    }
    
    const { nextElementSibling } = current
    
    return nextElementSibling
  },
  ArrowUp: async (list, current) => {
    const page = one('ul > li:not([aria-hidden="true"])', list)
  
    if (page.contains(current)) {
      const item = await ArrowUp(list, current)

      if (item) {
        return item
      }
      
      return
    }
    
    return one('li', page)
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