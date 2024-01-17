import { hotkey } from '@mailobj-browser/components-generics/js/hotkey/hotkey.js'
import object from '@mailobj-browser/front/js/utils/object.js'
import preventDefault from '@mailobj-browser/front/js/events/hooks/preventDefault.js'
import { onTapUp } from '@mailobj-browser/components-generics/js/selectors/templates/anchor.js'

const handler = object(null, {
    async task(
        element,
        event
    ) {
        preventDefault(event)
        const anchor = element.closest('a[href="javascript:"]')

        await onTapUp.trigger(anchor)
    }
})

export default (
    element
) => {
    hotkey(element, handler)
}
