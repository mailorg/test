import object from '@mailobj-browser/front/js/utils/object.js'
import * as menu from './menu.js'
import { display } from './menu.js'
import all from '@mailobj-browser/front/js/selectors/all.js'
import one from '@mailobj-browser/front/js/selectors/one.js'
import { elements } from '../../styles.js'
import inserted from '../../wait/inserted.js'

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

export default (
  list
) => {
  const select = opener(list)
  const { parentNode, ownerDocument } = list
  const { value = '' } = select
  const container = one(`.${elements.aside_lightboxes}`, ownerDocument)
  
  onKeyDown.listen(list)
  
  queueMicrotask(async () => {
    if (container !== parentNode) {
      await inserted(list, container)
    }
    
    await display(list, select)
  
    for (const input of all('input', list)) {
      if (input.value === value) {
        input.click()
        input.focus()
        break
      }
    }
  })
}
