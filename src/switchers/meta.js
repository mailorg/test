import { one } from '@mailo/front/selectors/one.js'
import { replace } from '@mailo/front/tree/replace.js'

export const meta = async (
  target
) => {
  const { name, property, ownerDocument } = target
  const selector = `meta[${name ? 'name' : 'property'}="${name || property}"]`
  const current = one(selector, ownerDocument)

  if (current && current !== target) {
    replace(current, target)
  }
}
