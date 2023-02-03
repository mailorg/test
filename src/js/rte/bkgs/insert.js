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
    button,
  ) {
    const origin = lightbox.opener(button.closest('[data-contract="menu.library"]'))
    const form = origin.closest('form')
    const rte = one('iframe', form)
  
    if (rte && rte.id) {
      const { src } = one('img', button)
      const { dataset } = button.parentNode
      const { repeat, attach, position, color } = dataset
      globals.ea_rte_exec_bkg(rte.id, src, repeat, attach, position, '', color, '')
    }
    close()
  }
})

export default button => {
  onClick.listen(button)
}

