import 'ace-builds/src-min/ace.js'
import 'ace-builds/src-min/mode-markdown.js'
import 'ace-builds/src-min/theme-clouds.js'
import listener from '@mailo/front/events/listeners/listener.js'
import submit from '@mailo/front/events/types/submit.js'
import defaults from '@mailo/front/selectors/defaults.js'
import after from '@mailo/front/tree/after.js'
import object from '@mailo/front/utils/object.js'

const { document, window } = defaults
const { ace } = window
const mode = 'ace/mode/markdown'
const theme = 'ace/theme/clouds'
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

export default (
  textarea
) => {
  const { clientHeight, clientWidth, form, value } = textarea
  const pre = document.createElement('pre')
  const { style } = pre
  const editor = ace.edit(pre, { mode, theme })
  const session = editor.getSession()

  console.log(form)

  editors.set(form, { session, textarea })
  session.setValue(value)
  style.height = `${clientHeight}px`
  style.width = `${clientWidth}px`
  textarea.classList.add('cl_display_none')
  after(textarea, pre)
  onSubmit.listen(form)
}
