import defaults from '@mailobj-js/front/selectors/defaults.js'
import defer from '@mailobj-js/front/tree/defer.js'
import replaceWith from '@mailobj-js/front/tree/replaceWith.js'
import config from './config.js'

const { window } = defaults

const task = pre => {
  const { CodeMirror } = window

  if (CodeMirror) {
    const { textContent } = pre
    const init = node => replaceWith(pre, node)

    CodeMirror(init, {
      ...config,
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
