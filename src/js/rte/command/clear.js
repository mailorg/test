import listener from '@mailobj-browser/front/js/events/listeners/listener.js'
import preventDefault from '@mailobj-browser/front/js/events/hooks/preventDefault.js'
import click from '@mailobj-browser/front/js/events/types/click.js'
import one from '@mailobj-browser/front/js/selectors/one.js'
import object from '@mailobj-browser/front/js/utils/object.js'
import rte from '../rte.js'

const onClick = object(listener, {
  type: click,
  hooks: [preventDefault],
  task(button) {
    const {contentDocument} = one('#id_msg_text', button.closest('form'))
    const {body} = contentDocument
    const {dataset} = button
    const msg = dataset.confirm

    if (confirm(msg)) {
      body.innerHTML = ""

      setTimeout(() => {
        body.focus()
      }, 100)
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
  rte(button, object(null, {test}))
}