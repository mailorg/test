import click from '@mailobj-browser/front/js/events/types/click.js'
import listener from '@mailobj-browser/front/js/events/listeners/listener.js'
import object from '@mailobj-browser/front/js/utils/object.js'
import preventDefault from '@mailobj-browser/front/js/events/hooks/preventDefault.js'
import stopImmediatePropagation from '@mailobj-browser/front/js/events/hooks/stopImmediatePropagation.js'
import one from '@mailobj-browser/front/js/selectors/one.js'

const onClick = object(listener, {
  type: click,
  task: (element, event) => {
    const { target } = event
    
    if (target === element) {
      preventDefault(event)
      stopImmediatePropagation(event)
      one('[data-contract="modal.cancel"]', element)?.click()
    }
  }
})


export default overlay => {
  onClick.listen(overlay)
}
