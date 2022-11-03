import object from '@mailobj-browser/front/js/utils/object.js'
import keyDown from '@mailobj-browser/front/js/events/types/keyDown.js'
import capture from '@mailobj-browser/front/js/events/options/capture.js'
import listener from '@mailobj-browser/front/js/events/listeners/listener.js'
import one from '@mailobj-browser/front/js/selectors/one.js'
import { open } from './menu.js'

const paginations = new WeakMap()

const focus = (
  list
) => {
  const pagination = paginations.get(list)
  const { children, page, size } = pagination
  const start = page * size
  const current = children[start]
  
  if (current) {
    current.scrollIntoView()
    current.focus()
    pagination.items = children.slice(start, size)
  }
  
  return current
}

const moves = object(null, {
  ArrowDown: (list, current) => {
    const { items } = paginations.get(list)
    const item = current.nextElementSibling
  
    if (items.includes(item)) {
      return item
    }
    
    return this.ArrowRight(list)
  },
  ArrowLeft: (list) => {
    const pagination = paginations.get(list)
    const { page } = pagination
  
    if (page) {
      pagination.page -= 1
      
      return focus(list)
    }
  },
  ArrowRight: (list) => {
    const pagination = paginations.get(list)
    const { page, pages } = pagination
  
    if (page < pages) {
      pagination.page += 1
      
      return focus(list)
    }
  },
  ArrowUp: (list, current) => {
    const { items } = paginations.get(list)
    const item = current.previousElementSibling
    
    if (items.includes(item)) {
      return item
    }
  
    return this.ArrowLeft(list)
  }
})

const onKeyDown = object(listener, {
  type: keyDown,
  capture,
  task (list, event) {
    const { key, target } = event
    const current = target.closest('li')
    const next = moves[key]?.(list, current)
    
    if (next) {
      event.preventDefault()
      event.stopImmediatePropagation()
      one('a, button, label', next).focus()
    }
  }
})

export default async (
  template
) => {
  const lightbox = await open(template)
  const list = one('ol,ul', lightbox)
  const { children: [...children], scrollHeight } = list
  const { height } = list.getBoundingClientRect()
  const { length } = children
  const page = 0
  const pages = Math.ceil(scrollHeight / height)
  const size = Math.floor(length / pages) + 1
  const items = children.slice(0, size)
  
  paginations.set(list, { children, items, page, pages, size })
  onKeyDown.listen(list)
}
