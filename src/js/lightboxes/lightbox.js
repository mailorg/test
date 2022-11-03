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
import { container } from './template/template.js'

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
  template
) => {
  const { dataset, ownerDocument } = template
  const { url } = dataset
  const body = element(ownerDocument, 'body')
  const { children: [lightbox] } = await render(template, url)
  
  append(body, lightbox)
  await manager.trigger(body)
  append(container(template), lightbox)
  
  return lightbox
}

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
  
  if (url) {
    const { fetched } = await text(object(null, {
      request: new Request(`${url}`)
    }))
    
    template.innerHTML = fetched
  }
  
  return invoke(template)
}
