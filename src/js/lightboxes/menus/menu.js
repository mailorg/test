import array from '@mailobj-browser/front/js/utils/array.js'
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
import contextMenu from '@mailobj-browser/front/js/events/types/contextMenu.js'
import { tapUp } from '@mailobj-browser/front/js/events/listeners/builtins/tap.js'

let current = null
let focusing = null

export const { focus, opener } = lightbox

export const close = () => {
  if (current) {
    onOpenerTapUp.forget(opener(current))
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

const onOpenerTapUp = object(tapUp, {
  hooks: array([
    preventDefault,
    stopImmediatePropagation
  ]),
  capture,
  once,
  task: close
})

const onResize = object(onCleanup, {
  capture,
  type: resize
})

const onScroll = object(onCleanup, {
  type: scroll
})

const onContextMenu = object(listener, {
  hooks: array([
    preventDefault
  ]),
  type: contextMenu,
  task: close
})

const onFocusIn = object(listener, {
  type: focusIn,
  capture,
  passive,
  task: (container, { target }) => {
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
    console.log(focusOut, focusing)
    
    requestAnimationFrame(() => {/*
      console.log('raf', focusing)
      if (!focusing) {
        remove(menu)
        focusing = null
      }*/
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

      if (element !== current) {
        const li = one('li', current)
        
        focus(li)
        this.listen(current)
        this.forget(element)
        
        return
      }
      
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
  onFocusIn.listen(container)
  
  return lightbox.parse(template, container, opener)
}

export const display = async (content, opener, event = null) => {
  const { ownerDocument } = opener
  const { defaultView } = ownerDocument
  const { onEscape } = lightbox
  const { fromEvent, fromNode, move, resize } = fixed
  const [promise, { resolve }] = resolvable()
  
  close()
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
    onContextMenu.listen(content)
    onOpenerTapUp.listen(opener)
    current = content
    resolve()
    
    requestAnimationFrame(() => {
      onFocusOut.listen(content)
      focusing = null
    })
  })
  
  return promise
}
