import object from '@mailobj-browser/front/js/utils/object.js'
import * as menu from './menu.js'

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

export default async (
  list
) => {
  onKeyDown.listen(list)
  menu.focus(list)
}
