import one from '@mailobj-browser/front/js/selectors/one.js'
import object from '@mailobj-browser/front/js/utils/object.js'
import listener from '@mailobj-browser/front/js/events/listeners/listener.js'
import click from '@mailobj-browser/front/js/events/types/click.js'
import passive from '@mailobj-browser/front/js/events/options/passive.js'
import { parse } from '@mailobj-browser/utilities/js/lightboxes/lightbox.js'

const openers = new WeakMap()

const onClick = object(listener, {
  type: click,
  passive,
  async task (
    select
  ) {
    console.log("select.js")
    const template = one(':scope > template', button)
    const lightbox = await parse(template)
    
    openers.set(lightbox, button)
  }
})

export const listen = (
  button
) => {
  onClick.listen(button)
}

export const button = (
  lightbox
) => {
  return openers.get(lightbox)
}
