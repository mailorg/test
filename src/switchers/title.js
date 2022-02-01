import one from '@mailobj-js/front/selectors/one.js'
import replace from '@mailobj-js/front/tree/replace.js'

export default async (
  target
) => {
  const { ownerDocument } = target
  const current = one('title', ownerDocument)

  if (current !== target) {
    replace(current, target)
  }
}
