import defaults from '@mailobj-js/front/selectors/defaults.js'
import replaceWith from '@mailobj-js/front/tree/replaceWith.js'

const { window } = defaults

export default (
  code
) => {
  requestAnimationFrame(() => {
    const { CodeMirror } = window
    const { textContent } = code
    const init = node => replaceWith(code, node)

    CodeMirror(init, {
      autoRefresh: true,
      scrollbarStyle: 'overlay',
      theme: 'moxer',
      mode: 'javascript',
      value: textContent
    })
  })
}
