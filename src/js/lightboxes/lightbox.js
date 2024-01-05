import object from '@mailobj-browser/front/js/utils/object.js'
import element from '@mailobj-browser/front/js/tree/element.js'
import invoke from '@mailobj-browser/front/js/tree/invoke.js'
import text from '@mailobj-browser/front/js/fetchers/text.js'
import manager from '@mailobj-browser/front/js/contracts/manager.js'
import append from '@mailobj-browser/front/js/tree/append.js'
import remove from '@mailobj-browser/front/js/tree/remove.js'
import listener from '@mailobj-browser/front/js/events/listeners/listener.js'
import prevented from '@mailobj-browser/front/js/events/listeners/prevented.js'
import capture from '@mailobj-browser/front/js/events/options/capture.js'
import removed from '../wait/removed.js'
import submit from '@mailobj-browser/front/js/events/types/submit.js'
import all from '@mailobj-browser/front/js/selectors/all.js'
import one from '@mailobj-browser/front/js/selectors/one.js'
import { fromEvent, fromNode, move, rect, resize } from '../fixed/fixed.js'
import keyUp from '@mailobj-browser/front/js/events/types/keyUp.js'
import scroll from '@mailobj-browser/front/js/events/types/scroll.js'
import focusType from '@mailobj-browser/front/js/events/types/focus.js'
import once from '@mailobj-browser/front/js/events/options/once.js'
import passive from '@mailobj-browser/front/js/events/options/passive.js'
import * as utilities from "../styles.js"
import preventDefault from '@mailobj-browser/front/js/events/hooks/preventDefault.js'
import stopImmediatePropagation from '@mailobj-browser/front/js/events/hooks/stopImmediatePropagation.js'
import { modifiers } from './styles.js'

let current = null
let menu = null
let stashed = []

const openers = new WeakMap()

const selector = `
  a[href]:not([hidden]):not([aria-hidden="true"]),
  button:not([disabled]):not([hidden]):not([aria-hidden="true"]),
  input:not([type="hidden"]):not([disabled]):not([hidden]):not([aria-hidden="true"]),
  textarea:not([disabled]):not([hidden]):not([aria-hidden="true"]),
  select:not([disabled]):not([hidden]):not([aria-hidden="true"]),
  details:not([hidden]):not([aria-hidden="true"]),
  [tabindex]:not([tabindex="-1"]):not([disabled]):not([hidden]):not([aria-hidden="true"])
`

const focusables = (dialog, reversed) => {
  const elements = all(selector, dialog).filter(visible)
  
  return reversed ?
    elements.toReversed() :
    elements
}

const visible = element => {
  const { height, width } = rect(element)
  
  return height && width
}

const opening = lightbox => {
  const opener = openers.get(lightbox)
  
  if (!opener) {
    return
  }
  
  opener.classList.add(modifiers.open)
  
  queueMicrotask(async () => {
    await removed(lightbox)
    opener.classList.remove(modifiers.open)
  })
}

export const stash = () => {
  if (menu) {
    stashed.length = 0
    stashed.push(menu, menu.parentNode)
    menu.remove()
  }
}

export const unstash = () => {
  if (stashed.length) {
    menu = stashed[0]
    stashed[1].append(menu)
    opening(menu)
    stashed.length = 0
  }
}

export const close = () => {
  if (current) {
    const { ownerDocument } = current
    const { body } = ownerDocument

    body.classList.remove(utilities.modifiers.overflow.hidden)
    onFocus.forget(body)
    remove(current)
    current = null
  }
}

export const focus = (
  item = null
) => {
  if (item) {
    one('a, button, label', item)?.focus()
  }
}

const onScroll = object(listener, {
  type: scroll,
  once,
  passive,
  task: close
})

export const onEscape = object(listener, {
  type: keyUp,
  task: (document, event) => {
    const { key } = event
    
    if (key !== 'Escape') {
      return
    }
    
    if (menu && document.contains(menu)) {
      preventDefault(event)
      stopImmediatePropagation(event)
      remove(menu)
      menu = null
      
      return
    }

    if (current) {
      preventDefault(event)
      stopImmediatePropagation(event)
      close()
    }
  }
})

const onFocus = object(listener, {
  type: focusType,
  capture,
  task: (body, event) => {
    const dialog = one('dialog', current)
    const { relatedTarget, target } = event
    const { ownerDocument } = body
    const { documentElement } = ownerDocument
    
    if (target === dialog) {
      documentElement.focus()
    } else if (relatedTarget === documentElement) {
      const [first] = all(selector, dialog).filter(focusables)
      
      first?.focus()
    }
  }
})

const onSubmit = object(prevented, {
  type: submit,
  task: () => {}
})

export const display = (content, opener, event = null) => {
  const {ownerDocument} = opener

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

    focus(content)
    onScroll.listen(ownerDocument)
    onEscape.listen(ownerDocument)
    current = content
  })
}

export const parse = async (
  template,
  container,
  opener = null,
  asModal = false
) => {
  const {dataset, ownerDocument} = template
  const {defaultView} = ownerDocument
  const {CustomEvent} = defaultView
  const {url} = dataset
  const body = element(ownerDocument, 'body')
  const {children: [lightbox]} = await render(template, url)
  const detail = object(null, {lightbox})

  openers.set(lightbox, opener)
  append(body, lightbox)
  await manager.trigger(body)
  template.dispatchEvent(new CustomEvent('load', { detail }))
  opening(lightbox)

  if (asModal) {
    if (menu) {
      remove(menu)
    }
    
    const { body } = ownerDocument
    
    body.classList.add(utilities.modifiers.overflow.hidden)
    current = lightbox
  } else {
    menu = lightbox
  }

  append(container, lightbox)

  for (const form of all('form[target="_self"]')) {
    onSubmit.listen(form)
  }

  queueMicrotask(async () => {
    await removed(lightbox)
    openers.delete(lightbox)
    
    if (asModal) {
      opener?.focus()
    }
  })

  queueMicrotask(async () => {
    await removed(opener)
    close()
    remove(lightbox)
  })

  return lightbox
}

const render = async (
  template,
  url
) => {
  const {ownerDocument} = template
  const {defaultView} = ownerDocument
  const {Request} = defaultView
  const clone = template.cloneNode(true)

  if (url) {
    const {fetched} = await text(object(null, {
      request: new Request(`${url}`)
    }))

    clone.innerHTML = fetched
  }

  return invoke(clone)
}

export const opener = lightbox => openers.get(lightbox)
