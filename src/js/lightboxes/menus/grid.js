import object from '@mailobj-browser/front/js/utils/object.js'
import keyDown from '@mailobj-browser/front/js/events/types/keyDown.js'
import capture from '@mailobj-browser/front/js/events/options/capture.js'
import listener from '@mailobj-browser/front/js/events/listeners/listener.js'
import one from '@mailobj-browser/front/js/selectors/one.js'
import { rect } from '../../fixed/fixed.js'
import { open } from './menu.js'

const moves = object(null, {
  ArrowDown: (list, current, x, y, { left, bottom }) => {
    return next(list, left + x, bottom + y) ??
      current.nextElementSibling ??
      list.firstElementChild
  },
  ArrowLeft: (list, current, x, y, { left, top }) => {
    return next(list, left - x, top + y) ??
      current.previousElementSibling ??
      list.lastElementChild
  },
  ArrowRight: (list, current, x, y, { right, top }) => {
    return next(list, right + x, top + y) ??
      current.nextElementSibling ??
      list.firstElementChild
  },
  ArrowUp: (list, current, x, y, { left, top }) => {
    return next(list, left + x, top - y) ??
      current.previousElementSibling ??
      list.lastElementChild
  }
})

const onKeyDown = object(listener, {
  type: keyDown,
  capture,
  task (list, event) {
    const { key, target } = event
    const current = target.closest('li')
    const coords = rect(current)
    const { height, width } = coords
    const next = moves[key]?.(list, current, height / 2, width / 2, coords)
    
    if (next) {
      event.preventDefault()
      event.stopImmediatePropagation()
      one('a, button, label', next).focus()
    }
  }
})

const next = ({ children }, x, y) => {
  for (const li of children) {
    const { bottom, left, right, top } = rect(li)
    
    if (x >= left && x <= right && y >= top && y <= bottom) {
      return li
    }
  }
}

export default async (
  template
) => {
  const lightbox = await open(template)
  const list = one('ol,ul', lightbox)
  
  onKeyDown.listen(list)
}
