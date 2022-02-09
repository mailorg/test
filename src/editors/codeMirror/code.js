import defaults from '@mailobj-js/front/selectors/defaults.js'
import defer from '@mailobj-js/front/tree/defer.js'
import replaceWith from '@mailobj-js/front/tree/replaceWith.js'

const { window } = defaults

const task = code => {
  const { CodeMirror } = window

  if (CodeMirror) {
    const { textContent } = code
    const init = node => replaceWith(code, node)

    CodeMirror(init, {
      autoRefresh: true,
      scrollbarStyle: 'overlay',
      theme: 'moxer',
      mode: 'javascript',
      value: textContent
    })

    return true
  }
}

export default (
  code
) => {
  defer(code, task)
}
