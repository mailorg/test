import remove from '@mailobj-browser/front/js/tree/remove.js'
import invoke from '@mailobj-browser/front/js/tree/invoke.js'
import append from '@mailobj-browser/front/js/tree/append.js'
import element from '@mailobj-browser/front/js/tree/element.js'
import manager from '@mailobj-browser/front/js/contracts/manager.js'
import object from '@mailobj-browser/front/js/utils/object.js'
import listener from '@mailobj-browser/front/js/events/listeners/listener.js'
import click from '@mailobj-browser/front/js/events/types/click.js'
import once from '@mailobj-browser/front/js/events/options/once.js'
import passive from '@mailobj-browser/front/js/events/options/passive.js'
import text from '@mailobj-browser/front/js/fetchers/text.js'
import {stopImmediatePropagation} from '@mailobj-browser/front/js/events/hooks/hooks.js'
import one from '@mailobj-browser/front/js/selectors/one.js'
import {elements} from '@mailobj-browser/components-generics/js/styles.js'
import {fromNode, move, rect, resize} from '../fixed/fixed.js'
import scroll from '@mailobj-browser/front/js/events/types/scroll.js'
import keyUp from '@mailobj-browser/front/js/events/types/keyUp.js'
import capture from '@mailobj-browser/front/js/events/options/capture.js'

const init = object(null, {
  clientX: 0,
  clientY: 0
})

let current = null

const onClickOut = object(listener, {
  type: click,
  once,
  passive,
  task (
    document,
    { target }
  ) {
    if (current && (current !== target) && !current.contains(target)) {
      close()
    }
  }
})

const onKeyUp = object(listener, {
  type: keyUp,
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
      one('a, button, input', next).focus()
    }
  }
})

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

const next = ({ children }, x, y) => {
  for (const li of children) {
    const { bottom, left, right, top } = rect(li)
    
    if (x >= left && x <= right && y >= top && y <= bottom) {
      return li
    }
  }
}

const render = async (
  template,
  url
) => {
  const { ownerDocument } = template
  const { defaultView } = ownerDocument
  const { Request } = defaultView
  
  if (url) {
    const { fetched } = await text(object(null, {
      request: new Request(`${url}`)
    }))
    
    template.innerHTML = fetched
  }
  
  return invoke(template)
}

export const open = async (
  template,
  container,
  url = template.dataset.url
) => {
  const { ownerDocument } = template
  const body = element(ownerDocument, 'body')
  const { children: [menu] } = await render(template, url)
  
  close()
  current = menu
  append(body, menu)
  await manager.trigger(body)
  append(container, menu)
  onClickOut.listen(ownerDocument)
  onKeyUp.listen(menu)
  
  return menu
}

export const close = () => {
  if (current) {
    remove(current)
    onClickOut.forget(current)
    current = null
  }
}

const openers = new WeakMap()

const onClick = object(listener, {
  type: click,
  passive,
  hooks: [stopImmediatePropagation],
  async task(
    opener
  ) {
    const { nextElementSibling, ownerDocument } = opener
    const aside = one(`body > .${elements.aside_lightboxes}`, ownerDocument)
    const menu = await open(nextElementSibling, aside)

    onScroll.listen(ownerDocument)
    move(menu, init)
    resize(menu, opener)
    move(menu, fromNode(menu, opener))
    one('a, button, input', menu)?.focus()
    openers.set(menu, opener)
  }
})

const onScroll = object(listener, {
  type: scroll,
  once,
  passive,
  task: close
})

export const listen = (
  opener
) => {
  onClick.listen(opener)
}

export const opener = (
  menu
) => {
  return openers.get(menu)
}
