import object from '@mailobj-browser/front/js/utils/object.js'
import * as menu from './menu.js'
import { display, opener } from './menu.js'
import * as grid from './grid.js'

const { ArrowDown, ArrowLeft, ArrowRight, ArrowUp } = grid.keys

export const {
  close,
  focus,
  open
} = menu

const keys = object(null, {
  ArrowDown: async (list, current) => {
    const item = await ArrowDown(list, current)
  
    if (item) {
      return item
    }
    
    const { lastElementChild } = list
    const { left, bottom, x, y } = grid.calc(list, current)
  
    return grid.item(lastElementChild, left + x, bottom + y)
  },
  ArrowLeft,
  ArrowRight,
  ArrowUp: async (list, current) => {
    const item = await ArrowUp(list, current)
  
    if (item) {
      return item
    }
  
    console.log({ list, current })
    const { lastElementChild } = list
    const { left, top, x, y } = grid.calc(list, current)
  
    return grid.item(lastElementChild, left + x, top - y)
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