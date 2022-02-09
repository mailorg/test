import defaults from '@mailobj-js/front/selectors/defaults.js'
import one from '@mailobj-js/front/selectors/one.js'
import defer from '@mailobj-js/front/tree/defer.js'
import replaceWith from '@mailobj-js/front/tree/replaceWith.js'
import config from './config.js'

const { window } = defaults

const entries = [
  ['language-js', 'javascript']
]

const task = contents => {
  const { CodeMirror } = window

  if (CodeMirror) {
    const { textContent } = contents
    const { className } = one('code', contents)
    const init = node => replaceWith(contents, node)
    const [, mode] = entries.find(([name]) => name === className) ?? []

    CodeMirror(init, {
      ...config,
      mode,
      readOnly: true,
      value: textContent
    })

    return true
  }
}

export default (
  contents
) => {
  defer(contents, task)
}
