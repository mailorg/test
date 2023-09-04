import { hotkey } from '@mailobj-browser/components-generics/js/hotkey/hotkey.js'
import object from '@mailobj-browser/front/js/utils/object.js'
import preventDefault from '@mailobj-browser/front/js/events/hooks/preventDefault.js'
import one from '@mailobj-browser/front/js/selectors/one.js'
import { open } from '../lightboxes/menus/menu.js'
import * as utilities from '../styles.js'

const handler = object(null, {
    async task(
        element,
        event
    ) {
        preventDefault(event)
        const { parentNode, ownerDocument } = element
        const template = one('template', parentNode)
        const container = one(`.${utilities.elements.aside_lightboxes}`, ownerDocument)

        await open(template, container)
    }
})

export default (
    element
) => {
    hotkey(element, handler)
}
