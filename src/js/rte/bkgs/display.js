import click from '@mailobj-browser/front/js/events/types/click.js'
import listener from '@mailobj-browser/front/js/events/listeners/listener.js'
import object from '@mailobj-browser/front/js/utils/object.js'
import one from '@mailobj-browser/front/js/selectors/one.js'
import preventDefault from '@mailobj-browser/front/js/events/hooks/preventDefault.js'
import matchingOrClosest from '@mailobj-browser/front/js/selectors/matchingOrClosest.js'
import functions from '../../ea/functions.js'
import rte from '../rte.js'

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

