import 'ace-builds/src-min-noconflict/ace.js'
import 'ace-builds/src-min-noconflict/mode-markdown.js'
import listener from '@mailobj-js/front/events/listeners/listener.js'
import submit from '@mailobj-js/front/events/types/submit.js'
import defaults from '@mailobj-js/front/selectors/defaults.js'
import before from '@mailobj-js/front/tree/before.js'
import defer from '@mailobj-js/front/tree/defer.js'
import object from '@mailobj-js/front/utils/object.js'

const { window } = defaults
const { ace } = window
const mode = 'ace/mode/markdown'
const editors = new WeakMap()

const onSubmit = object(listener, {
  type: submit,
  task (
    form
  ) {
    const { session, textarea } = editors.get(form)

    textarea.value = session.getValue()
  }
})

const render = (
  textarea
) => {
  const { form, offsetHeight, offsetWidth, ownerDocument, value } = textarea

  if (offsetHeight || offsetWidth) {
    const pre = ownerDocument.createElement('pre')
    const { style } = pre
    const editor = ace.edit(pre)
    const session = editor.getSession()

    editors.set(form, { session, textarea })
    session.setMode(mode)
    session.setValue(value)
    style.height = `${offsetHeight}px`
    style.width = `${offsetWidth}px`
    textarea.classList.add('cl_display_none')
    before(textarea, pre)
    onSubmit.listen(form)

    return true
  }
}

export default (
  element
) => {
  defer(element, render)
}
