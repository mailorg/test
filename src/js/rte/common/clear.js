import listener from '@mailobj-browser/front/js/events/listeners/listener.js'
import preventDefault from '@mailobj-browser/front/js/events/hooks/preventDefault.js'
import click from '@mailobj-browser/front/js/events/types/click.js'
import object from '@mailobj-browser/front/js/utils/object.js'
import globals from '../../ea/globals.js'
import rte from '../rte.js'

const onClick = object(listener, {
  type: click,
  hooks: [preventDefault],
  task () {
    globals.ea_rte_command_clear('id_msg_text')
  }
})

export default button => {
  onClick.listen(button)
  rte(button, null)
}
