import append from '@mailobj-js/front/tree/append.js'
import replaceChildren from '@mailobj-js/front/tree/replaceChildren.js'

export default (
  target,
  values
) => {
  const { ownerDocument } = target
  const options = []

  for (const value of values) {
    const option = ownerDocument.createElement('option')

    append(option, value)
    options.push(option)
  }

  replaceChildren(target, options)
}
