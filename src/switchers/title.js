import { one } from '@mailo/front/selectors/one.js'
import { replace } from '@mailo/front/tree/replace.js'

export const title = async (
  target
) => {
  const { ownerDocument } = target
  const current = one('title', ownerDocument)

  if (current !== target) {
    replace(current, target)
  }
}
