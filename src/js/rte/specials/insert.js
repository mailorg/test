import click from '@mailobj-browser/front/js/events/types/click.js'
import listener from '@mailobj-browser/front/js/events/listeners/listener.js'
import object from '@mailobj-browser/front/js/utils/object.js'
import {close, opener} from '../../menu/menu.js'
import {globals} from '../../ea/ea.js'
import one from '@mailobj-browser/front/js/selectors/one.js'

const onClick = object(listener, {
  type: click,
  task (
    button,
  ) {
    const src = button.value
    const origin = opener(button.parentNode)
    const form = origin.closest('form')
    const rte = one('iframe', form)
  
    if (rte && rte.id) {
      globals.ea_rte_exec_insert(rte.id, src)
    }
    close()
  }
})

export default button => {
  onClick.listen(button)
}

