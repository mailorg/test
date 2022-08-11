import listener from '@mailobj-js/front/js/events/listeners/listener.js'
import preventDefault from '@mailobj-js/front/js/events/hooks/preventDefault.js'
import click from '@mailobj-js/front/js/events/types/click.js'
import object from '@mailobj-js/front/js/utils/object.js'
import matchingOrClosest from '@mailobj-js/front/js/selectors/matchingOrClosest.js'
import functions from '../../ea/functions.js'
import rte from '../rte.js'

const onClick = object(listener, {
  type: click,
  hooks: [preventDefault],
  task (
    left,
    event
  ) {

    functions.ea_rte_command('id_msg_text', 'justifyleft', '')

  }
})

export const test = (
  text
) => {
  return matchingOrClosest('[style*="text-align: left"]', text)
}

export default button => {
  onClick.listen(button)
  rte(button, object(null, { test }))
}
