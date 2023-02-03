import object from '@mailobj-browser/front/js/utils/object.js'
import * as menu from './menu.js'
import { display } from './menu.js'

export const {
  close,
  focus,
  open,
  opener
} = menu

const keys = object(null, {
  ArrowDown: (list, current) => {
    return current.nextElementSibling
  },
  ArrowUp: (list, current) => {
    return current.previousElementSibling
  }
})

const onKeyDown = object(menu.onKeyDown, {
  keys
})

export default (
  list
) => {
  onKeyDown.listen(list)
  display(list, opener(list))
  menu.focus(list)
}
