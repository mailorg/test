import listener from '@mailobj-browser/front/js/events/listeners/listener.js'
import preventDefault from '@mailobj-browser/front/js/events/hooks/preventDefault.js'
import click from '@mailobj-browser/front/js/events/types/click.js'
import object from '@mailobj-browser/front/js/utils/object.js'
import globals from '../../ea/globals.js'
import rte from '../rte.js'

const onClick = object(listener, {
  type: click,
  hooks: [preventDefault],
  task (
    button
  ) {
    const { dataset } = button
    const { value } = dataset
    if (value) {
      globals.ea_rte_exec_insert('id_msg_text', '\n' + value.replace('/\r/g', '\n') + '\n')
    } else {
      const { confirm } = dataset
      if (confirm) {
        alert(confirm)
      }
    }
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
