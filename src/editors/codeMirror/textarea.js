import defaults from '@mailobj-js/front/selectors/defaults.js'
import defer from '@mailobj-js/front/tree/defer.js'
import config from './config.js'

const { window } = defaults

const task = textarea => {
  const { CodeMirror } = window

  if (CodeMirror) {
    CodeMirror.fromTextArea(textarea, config)

    return true
  }
}

export default (
  textarea
) => {
  defer(textarea, task)
}
