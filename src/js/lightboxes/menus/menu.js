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
import focusOut from '@mailobj-browser/front/js/events/types/focusOut.js'
import { onEscape } from '../lightbox.js'
import preventDefault from '@mailobj-browser/front/js/events/hooks/preventDefault.js'
import stopImmediatePropagation from '@mailobj-browser/front/js/events/hooks/stopImmediatePropagation.js'
import contextMenu from '@mailobj-browser/front/js/events/types/contextMenu.js'
import { tapUp } from '@mailobj-browser/front/js/events/listeners/builtins/tap.js'
import wait from '@mailobj-browser/front/js/utils/wait.js'

const openers = new WeakMap()
let current = null

export const { focus, opener, stash, unstash } = lightbox

export const close = () => {
  if (current) {
    onOpenerTapUp.forget(opener(current))
    remove(current)
    current = null
  }
}

export const list = element => {
  if (current && current.contains(element)) {
    return current
  }
}

export const isOpen = () => {
  return current && current.ownerDocument.contains(current)
}

const onScroll = object(listener, {
  type: scroll,
  capture,
  once,
  passive,
  task: (document, { target }) => {
    if (current && (target === document || !current.contains(target))) {
      close()
    }
  }
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

const onResize = object(listener, {
  capture,
  once,
  passive,
  type: resize,
  task: close
})

const onContextMenu = object(listener, {
  type: contextMenu,
  task: close
})

const onFocusOut = object(listener, {
  type: focusOut,
  capture,
  passive,
  task: async (list, { relatedTarget }) => {
    if (!relatedTarget) {
      await wait(150)
      requestAnimationFrame(close)
      
      return
    }

    if (list.contains(relatedTarget) && relatedTarget.matches('a,button,input')) {
      return
    }
    
    if (relatedTarget !== opener(list)) {
      requestAnimationFrame(close)
    }
  }
})

export const onKeyDown = object(listener, {
  type: keyDown,
  capture,
  async task (element, event) {
    const { keys } = this
    const { key, target } = event
    
    if (['Escape', 'Tab'].includes(key)) {
      const focusable = opener(current)
      
      close()
      focusable.focus()
      
      return
    }
    
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
    onContextMenu.listen(content)
    onFocusOut.listen(content)
    //onOpenerTapUp.listen(opener)
    current = content
    resolve()
    
    requestAnimationFrame(() => {
    })
  })
  
  return promise
}
