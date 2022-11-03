import object from '@mailobj-browser/front/js/utils/object.js'
import keyDown from '@mailobj-browser/front/js/events/types/keyDown.js'
import capture from '@mailobj-browser/front/js/events/options/capture.js'
import listener from '@mailobj-browser/front/js/events/listeners/listener.js'
import one from '@mailobj-browser/front/js/selectors/one.js'
import { close } from '../lightbox.js'

export { close }

const moves = object(null, {
  ArrowDown: (list, current) => {
    return current.nextElementSibling ??
      list.firstElementChild
  },
  ArrowUp: (list, current) => {
    return current.previousElementSibling ??
      list.lastElementChild
  }
})

const onKeyDown = object(listener, {
  type: keyDown,
  capture,
  task (list, event) {
    const { key, target } = event
    const current = target.closest('li')
    const next = moves[key]?.(list, current)
    console.log({ next })
    
    if (next) {
      event.preventDefault()
      event.stopImmediatePropagation()
      one('a, button, label', next).focus()
    }
  }
})

export default async (
  list
) => {
  console.log({ list })
  onKeyDown.listen(list)
}
