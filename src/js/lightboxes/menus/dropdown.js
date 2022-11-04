import object from '@mailobj-browser/front/js/utils/object.js'
import capture from '@mailobj-browser/front/js/events/options/capture.js'
import listener from '@mailobj-browser/front/js/events/listeners/listener.js'
import one from '@mailobj-browser/front/js/selectors/one.js'
import { close } from '../lightbox.js'
import keyUp from '@mailobj-browser/front/js/events/types/keyUp.js'
import item from '@mailobj-browser/components-generics/js/xaddrs/item.js'
import keyDown from '@mailobj-browser/front/js/events/types/keyDown.js'

export { close }

const focus = item => {
  one('a, button, label', item)?.focus()
}

const moves = object(null, {
  ArrowDown: (list, current, event) => {
    event.preventDefault()
    
    return current.nextElementSibling
  },
  ArrowUp: (list, current, event) => {
    event.preventDefault()
    
    return current.previousElementSibling
  }
})

const onKeyUp = object(listener, {
  type: keyDown,
  capture,
  task (list, event) {
    const { key, target } = event

    const current = target.closest('li')
    const move = moves[key]
    
    if (move) {
      event.preventDefault()
      event.stopImmediatePropagation()
      focus(move?.(list, current, event))
    }
  }
})

export default async (
  list
) => {
  onKeyUp.listen(list)
  focus(...list.children)
}
