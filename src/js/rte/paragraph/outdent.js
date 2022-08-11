import listener from '@mailobj-js/front/js/events/listeners/listener.js'
import preventDefault from '@mailobj-js/front/js/events/hooks/preventDefault.js'
import click from '@mailobj-js/front/js/events/types/click.js'
import object from '@mailobj-js/front/js/utils/object.js'
import functions from '../../ea/functions.js'
import rte from '../rte.js'

const onClick = object(listener, {
  type: click,
  hooks: [preventDefault],
  task (
    outdent,
    event
  ) {

    functions.ea_rte_command('id_msg_text', 'outdent', '')

  }
})

export const test = () => {
  return false
}

export default button => {
  onClick.listen(button)
  rte(button, object(null, { test }))
}
