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
    remove(button.closest('div.ea_generics__modal'))
  }
})

export default async message => {
  const { root } = defaults
  const template = one(`.${utilities.elements.aside_alerts} template`, root)
  const { content, parentNode } = template
  /* Edit MLE :
    Le dialog est dans plusieurs div pour le look
    Je recupere donc plus que le dialog
   */
  const alert = one('div.ea_generics__modal', content).cloneNode(true)
  const dialog = one('dialog', alert)
  const paragraph = one('p', dialog)
  const button = one('button', dialog)
  
  append(paragraph, message)
  onClick.listen(button)

  await manager.fragment(alert)
  replaceChildren(parentNode, template, alert)
  button.focus()
  await removed(alert)
}
