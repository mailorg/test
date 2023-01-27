import object from '@mailobj-browser/front/js/utils/object.js'
import element from '@mailobj-browser/front/js/tree/element.js'
import invoke from '@mailobj-browser/front/js/tree/invoke.js'
import text from '@mailobj-browser/front/js/fetchers/text.js'
import manager from '@mailobj-browser/front/js/contracts/manager.js'
import append from '@mailobj-browser/front/js/tree/append.js'
import remove from '@mailobj-browser/front/js/tree/remove.js'

let current = null

export const close = () => {
  if (current) {
    remove(current)
    current = null
  }
}

export const parse = async (
  template,
  container
) => {
  const { dataset, ownerDocument } = template
  const { url } = dataset
  const body = element(ownerDocument, 'body')
  const { children: [lightbox] } = await render(template, url)
  
  append(body, lightbox)
  await manager.trigger(body)
  append(container, lightbox)
  
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
    
    clone.innerHTML = fetched
  }
  
  return invoke(clone)
}
