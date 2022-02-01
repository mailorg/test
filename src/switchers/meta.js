import one from '@mailobj-js/front/selectors/one.js'
import replace from '@mailobj-js/front/tree/replace.js'

export default async (
  target
) => {
  const { name, property, ownerDocument } = target
  const selector = `meta[${name ? 'name' : 'property'}="${name || property}"]`
  const current = one(selector, ownerDocument)

  if (current && current !== target) {
    replace(current, target)
  }
}
