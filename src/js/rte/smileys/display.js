import all from '@mailobj-browser/front/js/selectors/all.js'
import click from '@mailobj-browser/front/js/events/types/click.js'
import listener from '@mailobj-browser/front/js/events/listeners/listener.js'
import object from '@mailobj-browser/front/js/utils/object.js'
import one from '@mailobj-browser/front/js/selectors/one.js'
import preventDefault from '@mailobj-browser/front/js/events/hooks/preventDefault.js'
import { get, set } from '../../contextMenu/contextMenu.js'
import previous from './previous.js'
import next from './next.js'
import globals from '../../ea/globals.js'
import rte from '../rte.js'

const onClick = object(listener, {
  type: click,
  hooks: [preventDefault],
  task (
    display
  ) {
    const rte = one('iframe', display.closest('form'))
    const list = one('#rte_opt_smiley')

    if (rte && list) {
      const pages = all('.cl_rte_smiley_table', list)
      // const pages = all('.ea_generics__smileys', list)

      for (const page of pages) {
        globals.ea_display(page, false)
      }
  
      globals.ea_display(pages[0], true)
      globals.ea_rte_context_menu(display, null, rte.id, 'smiley', 'rte_opt_smiley', null)
    }

    const contextMenu = one('#div_contextmenu')

    if (contextMenu) {
      set(contextMenu, {
        rte
      })

      for (const table of all('table', contextMenu)) {
        insert.listen(table)
      }

      const previousBtn = one('.cl_rte_smiley_bottom button:first-child', contextMenu)
      const nextBtn = one('.cl_rte_smiley_bottom button:last-child', contextMenu)
      // const previousBtn = one('.ea_generics__smileys_bottom button:first-child', contextMenu)
      // const nextBtn = one('.ea_generics__smileys_bottom button:last-child', contextMenu)

      previous(previousBtn)
      next(nextBtn)
    }
  }
})

const insert = object(listener, {
  type: click,
  task (
    element,
    { target }
  ) {
    const { src } = one('img', target) ?? target
    const contextMenu = element.closest('#div_contextmenu')
    const { rte } = get(contextMenu)
  
    globals.ea_rte_exec_insert_link(rte.id, src, 'image')
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

