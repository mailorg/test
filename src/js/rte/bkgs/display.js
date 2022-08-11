import all from '@mailobj-js/front/js/selectors/all.js'
import click from '@mailobj-js/front/js/events/types/click.js'
import functions from '@mailobj-js/utilities/js/ea/functions.js'
import listener from '@mailobj-js/front/js/events/listeners/listener.js'
import object from '@mailobj-js/front/js/utils/object.js'
import one from '@mailobj-js/front/js/selectors/one.js'
import preventDefault from '@mailobj-js/front/js/events/hooks/preventDefault.js'
import { get, set } from '../../selectors/contextMenu.js'
import rte from '../rte.js'
import matchingOrClosest from '@mailobj-js/front/js/selectors/matchingOrClosest.js'

const onClick = object(listener, {
  type: click,
  hooks: [preventDefault],
  task (
    display
  ) {
    const rte = one('iframe', display.closest('form'))
    const list = one('#rte_opt_bkg')

    if (rte && list) {
	  functions.ea_rte_context_menu(display, null, rte.id, 'bkg', 'rte_opt_bkg', null)
    }
  }
})

export const test = (
  text
) => {
  return matchingOrClosest('body[style*="background-image:"]', text)
}

export default button => {
  onClick.listen(button)
  rte(button, object(null, { test }))
}

