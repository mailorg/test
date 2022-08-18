import listener from '@mailobj-browser/front/js/events/listeners/listener.js'
import preventDefault from '@mailobj-browser/front/js/events/hooks/preventDefault.js'
import click from '@mailobj-browser/front/js/events/types/click.js'
import object from '@mailobj-browser/front/js/utils/object.js'
import matchingOrClosest from '@mailobj-browser/front/js/selectors/matchingOrClosest.js'
import globals from '../../ea/globals.js'
import rte from '../rte.js'

const onClick = object(listener, {
  type: click,
  hooks: [preventDefault],
  task (
    italic,
    event
  ) {
  
    globals.ea_rte_command('id_msg_text', 'italic', '')

  }
})

export const test = (
  text
) => {
  return matchingOrClosest('i', text)
}

export default button => {
  onClick.listen(button)
  rte(button, object(null, { test }))
}
