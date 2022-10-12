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
import { elements } from '@mailobj-browser/components-generics/js/styles.js'

let current = null

const onClickOut = object(listener, {
  type: click,
  once,
  passive,
  task (
    document,
    { target }
  ) {
    if (current && (current !== target) && (!current.contains(target))) {
      close()
    }
  }
})

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
  { clientX, clientY },
  url = template.dataset.url
) => {
  const { ownerDocument } = template
  const body = element(ownerDocument, 'body')
  const { children: [menu] } = await render(template, url)
  const { dataset } = menu
  
  close()
  current = menu
  Object.assign(dataset, { clientX, clientY })
  append(body, menu)
  await manager.trigger(body)
  append(container, menu)
  onClickOut.listen(ownerDocument)
  
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
    const aside = one(`body > .${elements.aside_fixed}`, ownerDocument)
    
    const menu = await open(nextElementSibling, aside, {
      clientX: 100,
      clientY: 100
    })
    
    openers.set(menu, opener)
  }
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
