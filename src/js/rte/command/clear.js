import listener from '@mailobj-browser/front/js/events/listeners/listener.js'
import preventDefault from '@mailobj-browser/front/js/events/hooks/preventDefault.js'
import click from '@mailobj-browser/front/js/events/types/click.js'
import touchStart from '@mailobj-browser/front/js/events/types/touchStart.js'
import one from '@mailobj-browser/front/js/selectors/one.js'
import object from '@mailobj-browser/front/js/utils/object.js'
import rte, {command_clear} from '../rte.js'

const onClick = object(listener, {
  type: click,
  hooks: [preventDefault],
  task(button) {
    const id = 'id_msg_text'
    const {ownerDocument} = button
    const iframe = one(`#${id}`, ownerDocument)
    const { contentWindow } = iframe
    const { document } = contentWindow
    console.log(iframe)
    command_clear(id)
    contentWindow.focus()
  }
})

export const test = (
  text
) => {
  return text
}

export default button => {
  onClick.listen(button)
  rte(button, object(null, {test}))
}
