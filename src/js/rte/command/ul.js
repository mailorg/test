import listener from '@mailobj-browser/front/js/events/listeners/listener.js'
import preventDefault from '@mailobj-browser/front/js/events/hooks/preventDefault.js'
import click from '@mailobj-browser/front/js/events/types/click.js'
import object from '@mailobj-browser/front/js/utils/object.js'
import rte, { command } from '../rte.js'

const onClick = object(listener, {
  type: click,
  hooks: [preventDefault],
  task () {
    command('id_msg_text', 'insertunorderedlist', '')
  }
})

export const test = (
  text
) => {
  return text
}

export default button => {
  onClick.listen(button)
  rte(button, object(null, { test }))
}
