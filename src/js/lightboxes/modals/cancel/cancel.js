import listener from '@mailobj-browser/front/js/events/listeners/listener.js'
import click from '@mailobj-browser/front/js/events/types/click.js'
import passive from '@mailobj-browser/front/js/events/options/passive.js'
import object from '@mailobj-browser/front/js/utils/object.js'
import keyUp from '@mailobj-browser/front/js/events/types/keyUp.js'
import preventDefault from '@mailobj-browser/front/js/events/hooks/preventDefault.js'
import stopImmediatePropagation from '@mailobj-browser/front/js/events/hooks/stopImmediatePropagation.js'
import remove from '@mailobj-browser/front/js/tree/remove.js'

export const onEscape = object(listener, {
  type: keyUp,
  task: (document, event) => {
    const { key } = event
    const anchor = one('[data-contract="modal.cancel"] ', document)
    
    if (anchor && key === 'Escape') {
      preventDefault(event)
      stopImmediatePropagation(event)
      onClick.task(anchor)
    }
  }
})

const onClick = object(listener, {
  type: click,
  passive,
  task: (anchor) => {
    remove(anchor.closest('[data-contract^="modal."]'))
  }
})

export default button => {
  const { ownerDocument } = button
  
  onClick.listen(button)
  onEscape.listen(ownerDocument)
}
