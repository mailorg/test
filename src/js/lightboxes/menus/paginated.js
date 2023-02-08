import object from '@mailobj-browser/front/js/utils/object.js'
import * as menu from './menu.js'
import { display, opener } from './menu.js'

export const {
  close,
  focus,
  open
} = menu

const paginations = new WeakMap()

const scroll = (
  list
) => {
  const pagination = paginations.get(list)
  const { children, page, size } = pagination
  const start = page * size
  const current = children[start]
  
  if (current) {
    pagination.items = children.slice(start, size)
    current.scrollIntoView()
    
    return current
  }
}

const keys = object(null, {
  ArrowDown: (list, current) => {
    const { items } = paginations.get(list)
    const next = current.nextElementSibling
  
    if (items.includes(next)) {
      return next
    }
    
    return this.ArrowRight(list)
  },
  ArrowLeft: (list) => {
    const pagination = paginations.get(list)
    const { page } = pagination
  
    if (page) {
      pagination.page -= 1
      
      return scroll(list)
    }
  },
  ArrowRight: (list) => {
    const pagination = paginations.get(list)
    const { page, pages } = pagination
  
    if (page < pages) {
      pagination.page += 1
      
      return scroll(list)
    }
  },
  ArrowUp: (list, current) => {
    const { items } = paginations.get(list)
    const previous = current.previousElementSibling
    
    if (items.includes(previous)) {
      return previous
    }
  
    return this.ArrowLeft(list)
  }
})

const onKeyDown = object(menu.onKeyDown, {
  keys
})

export default async (
  list
) => {
  const { children: [...children], scrollHeight } = list
  const { height } = list.getBoundingClientRect()
  const { length } = children
  const page = 0
  const pages = Math.ceil(scrollHeight / height)
  const size = Math.floor(length / pages) + 1
  const items = children.slice(0, size)

  paginations.set(list, { children, items, page, pages, size })
  onKeyDown.listen(list)
  display(list, opener(list))
  menu.focus(list)

  const rows = list.getAttribute('rows')
  const columns = list.getAttribute('columns')
  const columnWidth = list.getAttribute('columnWidth')
  list.setProperty('--ea_context_menu_library_rows', rows)
  list.setProperty('--ea_context_menu_library_columns', columns)
  list.setProperty('--ea_context_menu_library_columns_width', columnWidth)
}
