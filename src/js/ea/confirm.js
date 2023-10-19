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
import all from '@mailobj-browser/front/js/selectors/all.js'
import resolvable from '@mailobj-browser/front/js/utils/resolvable.js'
import object from '@mailobj-browser/front/js/utils/object.js'
import * as menu from '../lightboxes/menus/menu.js'

const resolvers = new WeakMap()

const onClick = object(listener, {
  type: click,
  once,
  passive,
  task: button => {
    const { value } = button
    
    remove(button.closest('div.ea_generics__modal'))
    resolvers.get(button)?.(value === '1')
  }
})

const confirm = async (
  title,
  text = '',
  openers = []
) => {
  const { root } = defaults
  const template = one(`.${utilities.elements.aside_confirms} template`, root)
  const { content, parentNode } = template
  const [promise, { resolve }] = resolvable()
  
  const confirm = one('div.ea_generics__modal', content).cloneNode(true)
  const dialog = one('dialog', confirm)
  const header = one('div.ea_generics__modal_header', dialog)
  const h2 = one('h2', header)
  
  const body = one('div.ea_generics__modal_main', dialog)
  const paragraph = one('p', body)
  
  const footer = one('div.ea_generics__modal_footer', dialog)
  const buttons = all('button', footer)
  const [focusable] = buttons
  
  append(h2, title)
  
  if (text.length) {
    append(paragraph, text)
  }
  
  for (const button of buttons) {
    resolvers.set(button, resolve)
    onClick.listen(button)
  }
  
  await manager.fragment(confirm)
  replaceChildren(parentNode, template, confirm)
  focusable.focus()
  
  const result = await Promise.race([promise, await removed(confirm)])
  
  for (const button of buttons) {
    resolvers.delete(button)
  }
  
  for (const opener of openers) {
    if (opener.ownerDocument?.contains(opener)) {
      opener.focus()
      break
    }
  }
  
  return result === true
}

export const fromOpener = async opener => {
  const { dataset } = opener
  const { confirm: message } = dataset
  
  if (!message) {
    return true
  }
  
  const { title, text = ''} = JSON.parse(message)
  const openers = [opener]
  const list = menu.list(opener)
  
  if (list) {
    openers.push(menu.opener(list))
  }
  
  const result = await confirm(title, text, openers)
  
  if (list) {
    menu.close()
  }
  
  return result
}

export default confirm
