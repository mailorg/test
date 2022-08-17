import defaults from '@mailobj-browser/front/js/selectors/defaults.js'
import one from '@mailobj-browser/front/js/selectors/one.js'
import defer from '@mailobj-browser/front/js/tree/defer.js'
import replaceWith from '@mailobj-browser/front/js/tree/replaceWith.js'
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
