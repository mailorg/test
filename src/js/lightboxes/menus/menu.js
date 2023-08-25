import object from '@mailobj-browser/front/js/utils/object.js'
import listener from '@mailobj-browser/front/js/events/listeners/listener.js'
import capture from '@mailobj-browser/front/js/events/options/capture.js'
import once from '@mailobj-browser/front/js/events/options/once.js'
import passive from '@mailobj-browser/front/js/events/options/passive.js'
import keyDown from '@mailobj-browser/front/js/events/types/keyDown.js'
import scroll from '@mailobj-browser/front/js/events/types/scroll.js'
import * as fixed from '../../fixed/fixed.js'
import * as lightbox from '../lightbox.js'
import resize from '@mailobj-browser/front/js/events/types/resize.js'
import remove from '@mailobj-browser/front/js/tree/remove.js'
import resolvable from '@mailobj-browser/front/js/utils/resolvable.js'
import one from '@mailobj-browser/front/js/selectors/one.js'
import mouseDown from '@mailobj-browser/front/js/events/types/mouseDown.js'
import focusIn from '@mailobj-browser/front/js/events/types/focusIn.js'
import focusOut from '@mailobj-browser/front/js/events/types/focusOut.js'
import { onEscape } from '../lightbox.js'
import preventDefault from '@mailobj-browser/front/js/events/hooks/preventDefault.js'
import stopImmediatePropagation from '@mailobj-browser/front/js/events/hooks/stopImmediatePropagation.js'
import wait from '@mailobj-browser/front/js/utils/wait.js'

let current = null
let focusing = null

export const { focus, opener } = lightbox

export const close = () => {
  if (current) {
    remove(current)
    current = null
    focusing = null
  }
}

export const list = element => {
  if (current && current.contains(element)) {
    return current
  }
}

const openers = new WeakMap()

const onCleanup = object(listener, {
  once,
  passive,
  task: close
})

const onResize = object(onCleanup, {
  capture,
  type: resize
})

const onScroll = object(onCleanup, {
  type: scroll
})

const onFocusIn = object(listener, {
  type: focusIn,
  capture,
  passive,
  task: (document, { target }) => {
    focusing = target
    console.log(focusIn, focusing)
  }
})

const onFocusOut = object(listener, {
  type: focusOut,
  capture,
  passive,
  task: async () => {
    const menu = current
    
    console.log('focusout')
    focusing = null
    onFocusIn.listen(menu)
    
    requestAnimationFrame(() => {
      if (!focusing) {
        remove(menu)
        console.log('removed')
      }
    })
  }
})

export const onKeyDown = object(listener, {
  type: keyDown,
  capture,
  async task (element, event) {
    const { keys } = this
    const { key, target } = event
    const { [key]: pick } = keys
    
    if (pick) {
      preventDefault(event)
      stopImmediatePropagation(event)
      
      const li = target.closest('li')
      const next = await pick(element, li, event)
      
      if (next) {
        focus(next)
      }
      
      return
    }
    
    if (key === 'Enter' && element === current) {
      const { ownerDocument } = target
      const { defaultView } = ownerDocument
      const { MouseEvent } = defaultView
      
      target.dispatchEvent(new MouseEvent(mouseDown, {
        buttons: 1
      }))
    }
  }
})

export const open = async (
  template,
  container,
  opener = null
) => {
  close()
  
  return lightbox.parse(template, container, opener)
}

export const display = async (content, opener, event = null) => {
  const { ownerDocument } = opener
  const { defaultView } = ownerDocument
  const { onEscape } = lightbox
  const { fromEvent, fromNode, move, resize } = fixed
  const [promise, { resolve }] = resolvable()

  move(content)
  
  requestAnimationFrame(() => {
    if (event) {
      move(content, fromEvent(content, event))
    } else {
      resize(content, opener)
      move(content, fromNode(content, opener))
      openers.set(content, opener)
    }
    
    onEscape.listen(ownerDocument)
    onScroll.listen(ownerDocument)
    onResize.listen(defaultView)
    onFocusOut.listen(content)
    current = content
    resolve()
  })
  
  return promise
}
