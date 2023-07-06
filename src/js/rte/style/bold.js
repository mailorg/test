import listener from '@mailobj-browser/front/js/events/listeners/listener.js'
import preventDefault from '@mailobj-browser/front/js/events/hooks/preventDefault.js'
import click from '@mailobj-browser/front/js/events/types/click.js'
import object from '@mailobj-browser/front/js/utils/object.js'
import one from '@mailobj-browser/front/js/selectors/one.js'
import rte from '../rte.js'

const onClick = object(listener, {
  type: click,
  hooks: [preventDefault],
  task(button) {
    const iframe = one('iframe', button.closest('form'))

    const {contentWindow, contentDocument} = iframe
    let {body} = contentDocument
    // globals.ea_rte_command('id_msg_text', 'bold', '')
    const boldElement = contentDocument.createElement('b')
    const userSelection = contentWindow.getSelection()
    console.log(userSelection);
    const selectedTextRange = userSelection.getRangeAt(0)
    selectedTextRange.surroundContents(boldElement)
  }
})

export const test = (
  text
) => {
  return text.closest('b')
}

export default button => {
  onClick.listen(button)
  rte(button, object(null, {test}))
}
