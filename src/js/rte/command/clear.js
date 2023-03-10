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
  task() {
    command_clear('id_msg_text')
  }
})

const onTouchStart = object(listener, {
  type: touchStart,
  hooks: [preventDefault],
  task(button) {
    // command_clear('id_msg_text')
    const {contentDocument} = one('#id_msg_text', button.closest('form'))
    contentDocument.innerHTML = ""
  }
})

export const test = (
  text
) => {
  return text
}

export default button => {
  // onClick.listen(button)
  onTouchStart.listen(button)
  rte(button, object(null, {test}))
}