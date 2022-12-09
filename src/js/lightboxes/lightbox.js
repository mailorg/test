import object from '@mailobj-browser/front/js/utils/object.js'
import element from '@mailobj-browser/front/js/tree/element.js'
import invoke from '@mailobj-browser/front/js/tree/invoke.js'
import text from '@mailobj-browser/front/js/fetchers/text.js'
import manager from '@mailobj-browser/front/js/contracts/manager.js'
import append from '@mailobj-browser/front/js/tree/append.js'
import listener from '@mailobj-browser/front/js/events/listeners/listener.js'
import once from '@mailobj-browser/front/js/events/options/once.js'
import passive from '@mailobj-browser/front/js/events/options/passive.js'
import remove from '@mailobj-browser/front/js/tree/remove.js'
import click from '@mailobj-browser/front/js/events/types/click.js'
import keyUp from '@mailobj-browser/front/js/events/types/keyUp.js'
import blur from '@mailobj-browser/front/js/events/types/blur.js'

let current = null

export const autoClose = (
  lightbox
) => {
  const { ownerDocument } = lightbox
  
  close()
  current = lightbox
  onClickOut.listen(lightbox)
  onEscape.listen(ownerDocument)
}

export const close = () => {
  if (current) {
    const { ownerDocument } = current
    
    remove(current)
    onClickOut.forget(current)
    onEscape.forget(ownerDocument)
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

const onClickOut = object(listener, {
  type: blur,
  once,
  passive,
  task (
    document
  ) {
    const { defaultView } = document
    const { requestAnimationFrame } = defaultView
  
    requestAnimationFrame(() => {
      const { activeElement } = document
      
      if (current && activeElement && !current.contains(activeElement)) {
        close()
      }
    })
  }
})

const onEscape = object(listener, {
  type: keyUp,
  once,
  passive,
  task: close
})

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
