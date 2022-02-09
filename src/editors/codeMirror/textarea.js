import defaults from '@mailobj-js/front/selectors/defaults.js'
import config from './config.js'

const { window } = defaults

export default (
  textarea
) => {
  requestAnimationFrame(() => {
    const { CodeMirror } = window

    CodeMirror.fromTextArea(textarea, config)
  })
}
