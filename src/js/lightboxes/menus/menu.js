import object from '@mailobj-browser/front/js/utils/object.js'
import listener from '@mailobj-browser/front/js/events/listeners/listener.js'
import capture from '@mailobj-browser/front/js/events/options/capture.js'
import once from '@mailobj-browser/front/js/events/options/once.js'
import passive from '@mailobj-browser/front/js/events/options/passive.js'
import one from '@mailobj-browser/front/js/selectors/one.js'
import keyDown from '@mailobj-browser/front/js/events/types/keyDown.js'
import scroll from '@mailobj-browser/front/js/events/types/scroll.js'
import { fromEvent, fromNode, move, resize } from '../../fixed/fixed.js'
import { autoClose, close, parse } from '../lightbox.js'
import { container, template } from '../openers/template.js'

export { autoClose, close }

const openers = new WeakMap()

const onScroll = object(listener, {
  type: scroll,
  once,
  passive,
  task: close
})

export const onKeyDown = object(listener, {
  type: keyDown,
  capture,
  task (list, event) {
    const { keys } = this
    const { key, target } = event
    const { [key]: pick } = keys
    
    if (pick) {
      const current = target.closest('li')
      const next = pick(list, current, event)
      
      event.preventDefault()
      event.stopImmediatePropagation()
      focus(next)
    }
  }
})

export const open = async (
  opener,
  event = null
) => {
  const { ownerDocument } = opener
  const content = await parse(template(opener), container(opener))

  close()
  move(content)
  
  if (event) {
    move(content, fromEvent(content, event))
  } else {
    resize(content, opener)
    move(content, fromNode(content, opener))
    openers.set(content, opener)
  }
  
  focus(content)
  onScroll.listen(ownerDocument)
  autoClose(content)
  
  return content
}

export const focus = (
  item = null
) => {
  if (item) {
    one('a, button, label', item)?.focus()
  }
}

export const opener = (
  menu
) => {
  return openers.get(menu)
}
