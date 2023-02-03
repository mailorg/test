import click from '@mailobj-browser/front/js/events/types/click.js'
import listener from '@mailobj-browser/front/js/events/listeners/listener.js'
import object from '@mailobj-browser/front/js/utils/object.js'
import * as lightbox from '../../lightboxes/lightbox.js'
import {close} from '../../lightboxes/menus/menu.js'
import {globals} from '../../ea/ea.js'
import one from '@mailobj-browser/front/js/selectors/one.js'

const onClick = object(listener, {
  type: click,
  task (
    button,
  ) {
    const origin = lightbox.opener(button.closest('[data-contract="menu.grid"]'))
    const form = origin.closest('form')
    const rte = one('iframe', form)
  
    if (rte && rte.id) {
      globals.ea_rte_exec_insert(rte.id, button.value)
    }
    close()
  }
})

export default button => {
  onClick.listen(button)
}

