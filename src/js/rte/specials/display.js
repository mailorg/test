import all from '@mailobj-browser/front/js/selectors/all.js'
import click from '@mailobj-browser/front/js/events/types/click.js'
import listener from '@mailobj-browser/front/js/events/listeners/listener.js'
import object from '@mailobj-browser/front/js/utils/object.js'
import one from '@mailobj-browser/front/js/selectors/one.js'
import preventDefault from '@mailobj-browser/front/js/events/hooks/preventDefault.js'
import { get, set } from '../../contextMenu/contextMenu.js'
import globals from '../../ea/globals.js'
import rte from '../rte.js'

const onClick = object(listener, {
  type: click,
  hooks: [preventDefault],
  task (
    display
  ) {
    const rte = one('iframe', display.closest('form'))
    const list = one('#rte_opt_special')

    if (rte && list) {
      globals.ea_rte_context_menu(display, null, rte.id, 'special', 'rte_opt_special', null)
    }

    const contextMenu = one('#div_contextmenu')

    if (contextMenu) {
      set(contextMenu, {
        rte
      })

      for (const button of all('button', contextMenu)) {
        insert.listen(button)
      }

    }
  }
})

const insert = object(listener, {
  type: click,
  task (
    element,
    { target }
  ) {
    const src = target.innerHTML;
    const contextMenu = element.closest('#div_contextmenu')
    const { rte } = get(contextMenu)
  
    globals.ea_rte_exec_insert(rte.id, src)
    globals.ea_context_menu_close()
  }
})

export const test = () => {
  return false
}

export default button => {
  onClick.listen(button)
  rte(button, object(null, { test }))
}

