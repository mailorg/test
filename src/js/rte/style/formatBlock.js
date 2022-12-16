import listener from '@mailobj-browser/front/js/events/listeners/listener.js'
import click from '@mailobj-browser/front/js/events/types/click.js'
import object from '@mailobj-browser/front/js/utils/object.js'
import rte, { command } from '../rte.js'

const onClick = object(listener, {
  type: click,
  task (
    button
  ) {
    command('id_msg_text', 'formatBlock', button.value)
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
