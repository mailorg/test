import globals from '@mailobj-browser/utilities/js/ea/globals.js'
import { hotkey } from '@mailobj-browser/components-generics/js/hotkey/hotkey.js'
import object from '@mailobj-browser/front/js/utils/object.js'
import preventDefault from '@mailobj-browser/front/js/events/hooks/preventDefault.js'

const handler = object(null, {
  task(
      element,
      event
  ) {
    preventDefault(event)
    const { dataset } = element
    const { url = '', target = '' } = dataset

    if (url === '') {
      return
    }
    globals.ea_link(url, target, null)
  }
})

export default (
  element
) => {
  hotkey(element, handler)
}
