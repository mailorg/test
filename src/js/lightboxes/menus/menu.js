import object from '@mailobj-browser/front/js/utils/object.js'
import listener from '@mailobj-browser/front/js/events/listeners/listener.js'
import once from '@mailobj-browser/front/js/events/options/once.js'
import passive from '@mailobj-browser/front/js/events/options/passive.js'
import one from '@mailobj-browser/front/js/selectors/one.js'
import scroll from '@mailobj-browser/front/js/events/types/scroll.js'
import { fromEvent, fromNode, move, resize } from '../../fixed/fixed.js'
import { close, parse } from '../lightbox.js'

const openers = new WeakMap()

const onScroll = object(listener, {
  type: scroll,
  once,
  passive,
  task: close
})

export const open = async (
  template,
  event = null
) => {
  const { ownerDocument, parentNode } = template
  const content = await parse(template)
  
  close()
  move(content)
  
  if (event) {
    move(content, fromEvent(content, event))
  } else {
    resize(content, parentNode)
    move(content, fromNode(content, parentNode))
    openers.set(content, parentNode)
  }
  
  one('a, button, label', content)?.focus()
  onScroll.listen(ownerDocument)
  
  return content
}
