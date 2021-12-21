import { one } from '@mailo/front/selectors/one.js'
import { replace } from '@mailo/front/tree/replace.js'

export const main = async (
  target
) => {
  const { ownerDocument } = target
  const current = one('#div_IN_MAIN', ownerDocument)

  if (current !== target) {
    replace(current, target)
  }
}
