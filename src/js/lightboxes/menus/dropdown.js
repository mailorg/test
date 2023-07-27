import object from '@mailobj-browser/front/js/utils/object.js'
import * as menu from './menu.js'
import { display } from './menu.js'
import all from '@mailobj-browser/front/js/selectors/all.js'

const selects = new WeakSet()

export const {
  close,
  focus,
  open,
  opener
} = menu

const keys = object(null, {
  ArrowDown: async (list, current) => {
    return current.nextElementSibling
  },
  ArrowUp: async (list, current) => {
    return current.previousElementSibling
  }
})

const onKeyDown = object(menu.onKeyDown, {
  keys,
  selects: list => selects.has(list)
})

export default async (
  list
) => {
  const element = opener(list)
  
  await display(list, element)
  
  if (element.matches('select')) {
    const { value = '' } = element
    
    onKeyDown.listen(list)
    selects.add(list)
  
    for (const input of all('input', list)) {
      if (input.value === value) {
        input.click()
        input.focus()
        break
      }
    }
  } else {
    onKeyDown.listen(element)
  }
}
