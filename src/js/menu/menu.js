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
import defer from '@mailobj-browser/front/js/tree/defer.js'

let current = null

const onClickOut = object(listener, {
  type: click,
  once,
  passive,
  task (
    document,
    { target }
  ) {
    if (current !== target && !current.contains(target)) {
      console.log({ onClickOut })
      close()
    }
  }
})

const listen = (
  document
) => {
  onClickOut.listen(document)
  
  return true
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
      request: new Request(`${url}`, {
        credentials: true
      })
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
  console.log({ container })
  const { children: [menu] } = await render(template, url)
  const { dataset } = menu
  
  console.log({ menu })
  close()
  current = menu
  Object.assign(dataset, { clientX, clientY })
  append(body, menu)
  await manager.trigger(body)
  append(container, menu)
  defer(ownerDocument, listen)
  console.log('menu done')
  
  return menu
}

export const close = () => {
  if (current) {
    remove(current)
    onClickOut.forget(current)
    current = null
  }
}
