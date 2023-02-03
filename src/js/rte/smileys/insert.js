import click from '@mailobj-browser/front/js/events/types/click.js'
import listener from '@mailobj-browser/front/js/events/listeners/listener.js'
import object from '@mailobj-browser/front/js/utils/object.js'
import one from '@mailobj-browser/front/js/selectors/one.js'
import {close} from '../../lightboxes/menus/menu.js'
import {globals} from '../../ea/ea.js'
import * as lightbox from '../../lightboxes/lightbox.js'

const onClick = object(listener, {
  type: click,
  task (
    img
  ) {
    const { src } = img
    const origin = lightbox.opener(img.closest('[data-contract="menu.library"]'))
    const form = origin.closest('form')
    const rte = one('iframe', form)
  
    if (rte && rte.id) {
      globals.ea_rte_exec_insert_link(rte.id, src, 'image')
    }
    close()
  }
})

export default img => {
  onClick.listen(img)
}

