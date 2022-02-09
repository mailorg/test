import defaults from '@mailobj-js/front/selectors/defaults.js'
import defer from '@mailobj-js/front/tree/defer.js'
import replaceWith from '@mailobj-js/front/tree/replaceWith.js'
import config from './config.js'

const { window } = defaults

const task = contents => {
  const { CodeMirror } = window

  if (CodeMirror) {
    const { textContent } = contents
    const init = node => replaceWith(contents, node)

    CodeMirror(init, {
      ...config,
      readonly: true,
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
