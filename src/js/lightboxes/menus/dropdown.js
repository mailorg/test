import object from '@mailobj-browser/front/js/utils/object.js'
import * as menu from './menu.js'
import { display } from './menu.js'
import all from '@mailobj-browser/front/js/selectors/all.js'

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
  keys
})

export default async (
  list
) => {
  const element = opener(list)
  const { value = '' } = element
  
  await display(list, element)
  focus(list)
  
  if (element.matches('select')) {
    for (const input of all('input', list)) {
      if (input.value === value) {
        input.click()
        input.focus()
        break
      }
    }
  }
  
  onKeyDown.listen(list)
}
