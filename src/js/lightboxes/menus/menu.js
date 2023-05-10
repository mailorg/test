import object from '@mailobj-browser/front/js/utils/object.js'
import listener from '@mailobj-browser/front/js/events/listeners/listener.js'
import capture from '@mailobj-browser/front/js/events/options/capture.js'
import once from '@mailobj-browser/front/js/events/options/once.js'
import passive from '@mailobj-browser/front/js/events/options/passive.js'
import keyDown from '@mailobj-browser/front/js/events/types/keyDown.js'
import scroll from '@mailobj-browser/front/js/events/types/scroll.js'
import preventDefault from '@mailobj-browser/front/js/events/hooks/preventDefault.js'
import * as fixed from '../../fixed/fixed.js'
import * as lightbox from '../lightbox.js'
import { container, template } from '../openers/template.js'
import blur from '@mailobj-browser/front/js/events/types/blur.js'
import keyUp from '@mailobj-browser/front/js/events/types/keyUp.js'
import resize from '@mailobj-browser/front/js/events/types/resize.js'
import remove from '@mailobj-browser/front/js/tree/remove.js'
import resolvable from '@mailobj-browser/front/js/utils/resolvable.js'
import one from '@mailobj-browser/front/js/selectors/one.js'

let current = null
let blurring = true

export const { focus } = lightbox

export const close = () => {
  if (current) {
    remove(current)
    current = null
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

const onBlur = object(listener, {
  type: blur,
  capture,
  passive,
  task (
    document
  ) {
    const { defaultView } = document
    const { requestAnimationFrame } = defaultView
    
    requestAnimationFrame(() => {
      const { activeElement } = document
      const isBlurred = blurring &&
        current &&
        activeElement &&
        current !== activeElement &&
        !current.contains(activeElement)
      
      if (isBlurred) {
        close()
      } else {
        console.log({ blurring })
        blurring = true
      }
    })
  }
})

const onEscape = object(listener, {
  type: keyUp,
  task: (document, event) => {
    const { key } = event
    
    if (current && key === 'Escape') {
      preventDefault(event)
      close()
    }
  }
})

export const onKeyDown = object(listener, {
  type: keyDown,
  capture,
  async task (element, event) {
    const { keys } = this
    const { key, target } = event
    const { [key]: pick } = keys
    console.log({ current, target })
    if (pick) {
      event.preventDefault()
      event.stopImmediatePropagation()

      if (element !== current) {
        const li = one('li', current)
        
        blurring = false
        focus(li)
        this.listen(current)
        this.forget(element)
        
        return
      }
      
      const li = target.closest('li')
      const next = await pick(element, li, event)
      
      focus(next)
    }
  }
})

export const open = async (
  opener
) => {
  return lightbox.parse(template(opener), container(opener), opener)
}

export const display = async (content, opener, event = null) => {
  const { ownerDocument } = opener
  const { defaultView } = ownerDocument
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
  
    onScroll.listen(ownerDocument)
    onBlur.listen(ownerDocument)
    onEscape.listen(ownerDocument)
    onResize.listen(defaultView)
    current = content
    resolve()
  })
  
  return promise
}

export const opener = (
  menu
) => {
  return lightbox.opener(menu)
}
