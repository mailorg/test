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
      console.log({ item })
      return item
    }
    
    const { lastElementChild } = list
    
    console.log(lastElementChild)
    
    return ArrowDown(lastElementChild, current)
  },
  ArrowLeft,
  ArrowRight,
  ArrowUp: async (list, current) => {
    const item = await ArrowUp(list, current)
  
    if (item) {
      return item
    }
  
    const { lastElementChild } = list
  
    return ArrowUp(lastElementChild, current)
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