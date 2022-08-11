import listener from '@mailobj-js/front/js/events/listeners/listener.js'
import preventDefault from '@mailobj-js/front/js/events/hooks/preventDefault.js'
import click from '@mailobj-js/front/js/events/types/click.js'
import object from '@mailobj-js/front/js/utils/object.js'
import functions from '@mailobj-js/utilities/js/ea/functions.js'
import rte from '../rte.js'
import matchingOrClosest from '@mailobj-js/front/js/selectors/matchingOrClosest.js'

const onClick = object(listener, {
  type: click,
  hooks: [preventDefault],
  task (
    justify,
    event
  ) {

    functions.ea_rte_command('id_msg_text', 'justifyfull', '')

  }
})

export const test = (
  text
) => {
  return matchingOrClosest('[style*="text-align: justify"]', text)
}

export default button => {
  onClick.listen(button)
  rte(button, object(null, { test }))
}
