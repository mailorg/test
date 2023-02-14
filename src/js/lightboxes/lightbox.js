import object from '@mailobj-browser/front/js/utils/object.js'
import element from '@mailobj-browser/front/js/tree/element.js'
import invoke from '@mailobj-browser/front/js/tree/invoke.js'
import text from '@mailobj-browser/front/js/fetchers/text.js'
import manager from '@mailobj-browser/front/js/contracts/manager.js'
import append from '@mailobj-browser/front/js/tree/append.js'
import remove from '@mailobj-browser/front/js/tree/remove.js'
import prevented from '@mailobj-browser/front/js/events/listeners/prevented.js'
import removed from '../wait/removed.js'
import submit from '@mailobj-browser/front/js/events/types/submit.js'
import all from '@mailobj-browser/front/js/selectors/all.js'

let current = null

const openers = new WeakMap()

const onSubmit = object(prevented, {
  type: submit
})

export const close = () => {
  if (current) {
    remove(current)
    current = null
  }
}

export const parse = async (
  template,
  container,
  opener = null
) => {
  const { dataset, ownerDocument } = template
  const { url } = dataset
  const body = element(ownerDocument, 'body')
  const { children: [lightbox] } = await render(template, url)
  
  openers.set(lightbox, opener)
  append(body, lightbox)
  await manager.trigger(body)
  append(container, lightbox)
  current = lightbox
  
  for (const form of all('form[target="_self"]')) {
    onSubmit.listen(form)
  }
  
  queueMicrotask(async () => {
    await removed(lightbox)
    openers.delete(lightbox)
  })
  
  return lightbox
}

const render = async (
  template,
  url
) => {
  const { ownerDocument } = template
  const { defaultView } = ownerDocument
  const { Request } = defaultView
  const clone = template.cloneNode(true)
  
  if (url) {
    const { fetched } = await text(object(null, {
      request: new Request(`${url}`)
    }))
    
    if (clone.hasChildNodes()) {
      clone.firstChild.innerHTML = fetched
    } else {
      clone.innerHTML = fetched
    }
  }
  
  return invoke(clone)
}

export const opener = lightbox => openers.get(lightbox)
