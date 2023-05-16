import * as utilities from '../styles.js'
import defaults from '@mailobj-browser/front/js/selectors/defaults.js'
import listener from '@mailobj-browser/front/js/events/listeners/listener.js'
import click from '@mailobj-browser/front/js/events/types/click.js'
import once from '@mailobj-browser/front/js/events/options/once.js'
import passive from '@mailobj-browser/front/js/events/options/passive.js'
import one from '@mailobj-browser/front/js/selectors/one.js'
import append from '@mailobj-browser/front/js/tree/append.js'
import remove from '@mailobj-browser/front/js/tree/remove.js'
import replaceChildren from '@mailobj-browser/front/js/tree/replaceChildren.js'
import removed from '../wait/removed.js'
import manager from '@mailobj-browser/front/js/contracts/manager.js'
import object from '@mailobj-browser/front/js/utils/object.js'

const onClick = object(listener, {
  type: click,
  once,
  passive,
  task: button => {
    remove(button.closest('dialog'))
  }
})

export default async message => {
  const { root } = defaults
  const template = one(`.${utilities.elements.aside_alerts} template`, root)
  const { content, parentNode } = template
  const paragraph = one('p', content)
  const button = one('button', content)
  
  append(paragraph, message)
  onClick.listen(button)
  console.log({ alert: content })
  await manager.fragment(content)
  replaceChildren(parentNode, template, content)
  console.log('added')
  await removed(content)
  console.log('removed')
}
