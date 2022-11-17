import globals from '@mailobj-browser/utilities/js/ea/globals.js'
import { hotkey } from '@mailobj-browser/components-generics/js/hotkey/hotkey.js'
import object from '@mailobj-browser/front/js/utils/object.js'

const handler = object(null, {
  task(
      element,
      event
  ) {
    event.preventDefault()

    const {dataset} = element
    const {url} = dataset

    if (url) {
      globals.ea_link(url, '', null)
    }
  }
})

export default (
  element
) => {
  hotkey(element, handler)
}
