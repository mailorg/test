import globals from '@mailobj-browser/utilities/js/ea/globals.js'
import { hotkey } from '@mailobj-browser/components-generics/js/hotkey/hotkey.js'
import object from '@mailobj-browser/front/js/utils/object.js'

const handler = object(null, {
  task(
      element,
      event
  ) {
    event.preventDefault()

    const { dataset } = element
    const { url, target } = dataset

    const targetUrl = target !== undefined ? target : ''
    if (url !== "") {
      return
    }
    globals.ea_link(url, targetUrl, null)
  }
})

export default (
  element
) => {
  hotkey(element, handler)
}
