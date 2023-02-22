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
  ArrowLeft,
  ArrowRight,
  ArrowUp: async (list, current) => {
    const page = one('ul > li:not([aria-hidden="true"])', list)
  
    if (page.contains(current)) {
      const item = await ArrowUp(list, current)

      if (item) {
        return item
      }
      
      return
    }
    
    const { children } = page
    const [first] = children
    const { x, y } = grid.calc(first)
    const { left, top } = grid.calc(current)
  
    console.log(grid.item(page, left + x, top - y))
    return grid.item(page, left + x, top - y)
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