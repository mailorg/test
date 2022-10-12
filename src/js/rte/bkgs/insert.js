import click from '@mailobj-browser/front/js/events/types/click.js'
import listener from '@mailobj-browser/front/js/events/listeners/listener.js'
import object from '@mailobj-browser/front/js/utils/object.js'
import one from '@mailobj-browser/front/js/selectors/one.js'
import preventDefault from '@mailobj-browser/front/js/events/hooks/preventDefault.js'
import {globals} from '../../ea/ea.js'
import {close, opener} from '../../menu/menu.js'
import all from '@mailobj-browser/front/js/selectors/all.js'

const onClick = object(listener, {
  type: click,
  hooks: [preventDefault],
  task (
    bkgs,
  ) {
    const origin = opener(bkgs.parentNode)
    const form = origin.closest('form')
    const rte = one('iframe', form)
  
    if (rte && rte.id) {
      for (const img of all('img', bkgs)) {
        const { src } = img
        globals.ea_rte_exec_bkg(rte.id, src, 'repeat', 'attach', 'position', 'bkg', 'color', 'padding')
      }
    }
    close()
  }
})

export default bkgs => {
  onClick.listen(bkgs)
}

