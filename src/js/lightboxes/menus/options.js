import dropdown, { opener } from './dropdown.js'
import keyDown from '@mailobj-browser/front/js/events/types/keyDown.js'
import mouseDown from '@mailobj-browser/front/js/events/types/mouseDown.js'

const observe = select => {
  const { ownerDocument } = select
  const { defaultView } = ownerDocument
  const { MutationObserver } = defaultView
  
  
}

const onKeyDown = object(prevented, {
  type: keyDown,
  task
})

const onMouseDown = object(prevented, {
  type: mouseDown,
  task
})

export default (
  list
) => {
  const select = opener(list)
  const { value = null } = select
  
  dropdown(list)
  
  if (value === null) {
    return
  }
  
  one(`[value="${value}"]`, list)?.focus()
}